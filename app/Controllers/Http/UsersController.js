"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async index({ request }) {
        const page = request.input('page', 1);
        const limit = 10;
        const users = await Database_1.default.from('users').paginate(page, limit);
        return users;
    }
    async store({ request }) {
        const userSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            email: Validator_1.schema.string({ trim: true }, [Validator_1.rules.email()]),
            password: Validator_1.schema.string(),
            access: Validator_1.schema.string(),
        });
        await request.validate({ schema: userSchema });
        const data = request.only(['name', 'email', 'password', 'access']);
        const checkUserExists = await User_1.default.findBy('email', data.email);
        if (checkUserExists) {
            throw new Error('Email address already used ');
        }
        const user = await User_1.default.create(data);
        return user;
    }
    async show({ params }) {
        const user = await User_1.default.findOrFail(params.id);
        return user;
    }
    async update({ request, params }) {
        const user = await User_1.default.findOrFail(params.id);
        const data = request.only(['name', 'email', 'password', 'access']);
        user.merge(data);
        await user.save();
        return user;
    }
    async destroy({ params }) {
        const user = await User_1.default.findOrFail(params.id);
        await user.delete();
    }
    async search({ params }) {
        const userSearch = await Database_1.default.from('users').where('name', 'like', `%${params.search}%`);
        return userSearch;
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map