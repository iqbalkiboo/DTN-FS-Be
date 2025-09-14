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
exports.RawDataSchema = exports.RawData = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RawData = class RawData {
    resultTime;
    enodebId;
    cellId;
    availDur;
};
exports.RawData = RawData;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], RawData.prototype, "resultTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RawData.prototype, "enodebId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RawData.prototype, "cellId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], RawData.prototype, "availDur", void 0);
exports.RawData = RawData = __decorate([
    (0, mongoose_1.Schema)()
], RawData);
exports.RawDataSchema = mongoose_1.SchemaFactory.createForClass(RawData);
exports.RawDataSchema.index({ enodebId: 1, cellId: 1, resultTime: 1 }, { unique: true });
//# sourceMappingURL=raw-data.schema.js.map