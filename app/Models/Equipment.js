"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class Equipment extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Equipment.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "user_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "name", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "group", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "brand", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "model", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "purchase_price", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "description", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "date_acquisition", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "nf", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "key_nf", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "provider", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "depreciation_date", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "depreciation_percentage", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "useful_life", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "serial", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "patrimony", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Equipment.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Equipment.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Equipment.prototype, "updatedAt", void 0);
exports.default = Equipment;
//# sourceMappingURL=Equipment.js.map