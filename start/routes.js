"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/login', 'AuthController.login');
Route_1.default.resource('api/users', 'UsersController').middleware({
    '*': ['auth'],
});
Route_1.default.resource('api/equipments', 'EquipmentsController').middleware({
    '*': ['auth'],
});
Route_1.default.get('/api/equipments-last', 'EquipmentsController.indexLast');
Route_1.default.get('/api/equipments-search/:search', 'EquipmentsController.search').middleware('auth');
Route_1.default.get('/api/equipments-filter/:filter', 'EquipmentsController.filter').middleware('auth');
Route_1.default.get('/api/users-search/:search', 'UsersController.search').middleware('auth');
Route_1.default.get('uploads/:filename', async ({ params, response }) => {
    return response.attachment(Application_1.default.tmpPath('uploads', params.filename));
});
Route_1.default.get('file/:filename', async ({ params, response }) => {
    const image = fs_1.default.createReadStream(Application_1.default.tmpPath('uploads', params.filename));
    response.stream(image);
});
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
//# sourceMappingURL=routes.js.map