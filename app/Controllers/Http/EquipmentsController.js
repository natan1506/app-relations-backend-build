"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Equipment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Equipment"));
const ImageEquipment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ImageEquipment"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class EquipmentsController {
    async index({ request }) {
        const page = request.input('page', 1);
        const limit = 15;
        const equipments = await Database_1.default.from('equipment').paginate(page, limit);
        let equipmentWithImage = [];
        const meta = equipments.getMeta();
        for (let equipment of equipments) {
            const imageEquipmentExist = await ImageEquipment_1.default.findByOrFail('equipment_id', `${equipment.id}`);
            let newEquipment = { equipment, image: imageEquipmentExist };
            equipmentWithImage.push(newEquipment);
        }
        return { equipmentWithImage, meta };
    }
    async store({ request, response, auth }) {
        const equipmentSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            group: Validator_1.schema.string(),
            brand: Validator_1.schema.string(),
            model: Validator_1.schema.string(),
            patrimony: Validator_1.schema.string(),
        });
        await request.validate({ schema: equipmentSchema });
        const data = request.only([
            'name',
            'group',
            'brand',
            'model',
            'purchase_price',
            'description',
            'date_acquisition',
            'nf',
            'key_nf',
            'provider',
            'depreciation_date',
            'depreciation_percentage',
            'useful_life',
            'serial',
            'patrimony',
        ]);
        const equipments = await Equipment_1.default.all();
        for (let equipment of equipments) {
            if (equipment.patrimony === data.patrimony) {
                return response.status(401).json('número de patrimonio ja existente');
            }
        }
        let newData;
        if (auth.user) {
            newData = { ...data, user_id: auth.user.id, status: 0 };
        }
        else {
            return response.status(401).json('precisa estar autenticado');
        }
        const equipment = await Equipment_1.default.create(newData);
        const images = request.files('images', {
            extnames: ['jpg', 'png'],
        });
        for (let image of images) {
            const filehash = crypto_1.default.randomBytes(10).toString('hex');
            const fileName = `${filehash}-${image.clientName}`;
            await image.move(Application_1.default.tmpPath('uploads'), {
                name: fileName,
            });
            await ImageEquipment_1.default.create({
                equipment_id: equipment.id,
                file_name: fileName,
                path: `tmp/uploads/${fileName}`,
            });
        }
        return equipment;
    }
    async show({ params }) {
        const equipment = await Equipment_1.default.findOrFail(params.id);
        const imageEquipmentExist = await ImageEquipment_1.default.query()
            .where('equipment_id', equipment.id)
            .limit(1);
        let data = { equipment, image: imageEquipmentExist[0] };
        return data;
    }
    async update({ request, params }) {
        try {
            const data = request.only([
                'name',
                'group',
                'brand',
                'model',
                'status',
                'purchase_price',
                'description',
                'date_acquisition',
                'nf',
                'key_nf',
                'provider',
                'depreciation_date',
                'depreciation_percentage',
                'useful_life',
                'serial',
                'patrimony',
            ]);
            const equipment = await Equipment_1.default.findOrFail(params.id);
            const images = request.files('images', {
                extnames: ['jpg', 'png'],
            });
            if (images.length > 0) {
                const imagesEquipmentExists = await ImageEquipment_1.default.query().where('equipment_id', equipment.id);
                for (let imageEquipmentExist of imagesEquipmentExists) {
                    const filePath = path_1.default.resolve(Application_1.default.tmpPath('uploads'), imageEquipmentExist.file_name);
                    await fs_1.default.promises.unlink(filePath);
                    await imageEquipmentExist.delete();
                }
            }
            for (let image of images) {
                const filehash = crypto_1.default.randomBytes(10).toString('hex');
                const fileName = `${filehash}-${image.clientName}`;
                await image.move(Application_1.default.tmpPath('uploads'), {
                    name: fileName,
                });
                await ImageEquipment_1.default.create({
                    equipment_id: equipment.id,
                    file_name: fileName,
                    path: `tmp/uploads/${fileName}`,
                });
            }
            equipment.merge(data);
            await equipment.save();
            return equipment;
        }
        catch (err) {
            throw new Error('Algo deu errado ao atualizar o equipamento!');
        }
    }
    async indexLast() {
        const equipment = await Equipment_1.default.query().orderBy('id', 'desc').limit(1);
        const imagesEquipmentExists = await ImageEquipment_1.default.query()
            .where('equipment_id', equipment[0].id)
            .limit(1);
        let data = { equipment: equipment, images: imagesEquipmentExists };
        return data;
    }
    async search({ params }) {
        const equipmentSearch = await Database_1.default.from('equipment')
            .where('name', params.search)
            .orWhere('patrimony', params.search);
        let equipmentWithImage = [];
        for (let equipment of equipmentSearch) {
            const imageEquipmentExist = await ImageEquipment_1.default.findByOrFail('equipment_id', `${equipment.id}`);
            let newEquipment = { equipment, image: imageEquipmentExist };
            equipmentWithImage.push(newEquipment);
        }
        return equipmentWithImage;
    }
    async filter({ params }) {
        const equipmentSearch = await Database_1.default.from('equipment').where('status', params.filter);
        let equipmentWithImage = [];
        for (let equipment of equipmentSearch) {
            const imageEquipmentExist = await ImageEquipment_1.default.findByOrFail('equipment_id', `${equipment.id}`);
            let newEquipment = { equipment, image: imageEquipmentExist };
            equipmentWithImage.push(newEquipment);
        }
        return equipmentWithImage;
    }
}
exports.default = EquipmentsController;
//# sourceMappingURL=EquipmentsController.js.map