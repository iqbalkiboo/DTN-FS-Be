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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RawDataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const raw_data_schema_1 = require("./raw-data.schema");
let RawDataService = RawDataService_1 = class RawDataService {
    rawModel;
    logger = new common_1.Logger(RawDataService_1.name);
    constructor(rawModel) {
        this.rawModel = rawModel;
    }
    async insertManyUnique(docs) {
        const results = [];
        for (const doc of docs) {
            try {
                const res = await this.rawModel
                    .updateOne({
                    enodebId: doc.enodebId,
                    cellId: doc.cellId,
                    resultTime: doc.resultTime,
                }, { $setOnInsert: doc }, { upsert: true })
                    .exec();
            }
            catch (err) {
                this.logger.error('Insert error: ' + err.message);
            }
        }
        return results;
    }
    async queryGraph(enodebId, cellId, startDate, endDate) {
        const filter = {};
        if (enodebId)
            filter.enodebId = enodebId;
        if (cellId)
            filter.cellId = cellId;
        if (startDate || endDate)
            filter.resultTime = {};
        if (startDate)
            filter.resultTime.$gte = startDate;
        if (endDate)
            filter.resultTime.$lte = endDate;
        const docs = await this.rawModel
            .find(filter)
            .sort({ resultTime: 1 })
            .lean()
            .exec();
        return docs.map((d) => ({
            resultTime: d.resultTime,
        }));
    }
};
exports.RawDataService = RawDataService;
exports.RawDataService = RawDataService = RawDataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(raw_data_schema_1.RawData.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RawDataService);
//# sourceMappingURL=raw-data.service.js.map