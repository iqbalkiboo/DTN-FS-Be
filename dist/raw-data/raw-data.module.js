"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDataModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const raw_data_service_1 = require("./raw-data.service");
const raw_data_controller_1 = require("./raw-data.controller");
const raw_data_schema_1 = require("./raw-data.schema");
let RawDataModule = class RawDataModule {
};
exports.RawDataModule = RawDataModule;
exports.RawDataModule = RawDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: raw_data_schema_1.RawData.name, schema: raw_data_schema_1.RawDataSchema }]),
        ],
        controllers: [raw_data_controller_1.RawDataController],
        providers: [raw_data_service_1.RawDataService],
    })
], RawDataModule);
//# sourceMappingURL=raw-data.module.js.map