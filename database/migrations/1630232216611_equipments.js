"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Equipments extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'equipment';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.string('name');
            table.string('group');
            table.string('brand');
            table.string('model');
            table.string('purchase_price');
            table.string('description');
            table.string('date_acquisition');
            table.string('nf');
            table.string('key_nf');
            table.string('provider');
            table.string('depreciation_date');
            table.string('depreciation_percentage');
            table.string('useful_life');
            table.string('serial');
            table.string('patrimony');
            table.string('status');
            table.timestamps(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Equipments;
//# sourceMappingURL=1630232216611_equipments.js.map