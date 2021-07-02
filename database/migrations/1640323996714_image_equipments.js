"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ImageEquipments extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'image_equipments';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table
                .integer('equipment_id')
                .unsigned()
                .references('id')
                .inTable('equipment')
                .onDelete('CASCADE');
            table.string('path').notNullable();
            table.string('file_name').notNullable();
            table.timestamps(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = ImageEquipments;
//# sourceMappingURL=1640323996714_image_equipments.js.map