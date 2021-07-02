"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AuthController {
    async login({ request, response, auth }) {
        const email = request.input('email');
        const password = request.input('password');
        try {
            const token = await auth.use('api').attempt(email, password);
            if (token) {
                const user = await User_1.default.query().where('email', email).firstOrFail();
                return { user, token: token.toJSON() };
            }
        }
        catch {
            return response.badRequest('Invalid credentials');
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map