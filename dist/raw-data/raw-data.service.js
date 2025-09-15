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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const raw_data_schema_1 = require("./raw-data.schema");
const dayjs_1 = __importDefault(require("dayjs"));
let RawDataService = class RawDataService {
    rawDataModel;
    constructor(rawDataModel) {
        this.rawDataModel = rawDataModel;
    }
    async findAll() {
        return this.rawDataModel.find().lean();
    }
    async insertMany(rows) {
        const bulkOps = rows.map((row) => ({
            updateOne: {
                filter: {
                    enodebId: row.enodebId,
                    cellId: row.cellId,
                    resultTime: row.resultTime,
                },
                update: { $set: row },
                upsert: true,
            },
        }));
        return this.rawDataModel.bulkWrite(bulkOps);
    }
    async getGraph(enodebId, cellId, startDate, endDate) {
        const start = (0, dayjs_1.default)(startDate, ["YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ"], true);
        const end = (0, dayjs_1.default)(endDate, ["YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ"], true);
        if (!start.isValid() || !end.isValid()) {
            throw new common_1.BadRequestException("Invalid date format. Use YYYY-MM-DD or ISO string.");
        }
        const result = await this.rawDataModel
            .find({
            enodebId,
            cellId,
            resultTime: { $gte: start.toDate(), $lte: end.toDate() },
        })
            .exec();
        return result.map((r) => ({
            resultTime: r.resultTime,
            availability: (r.availDur / 900) * 100,
        }));
    }
};
exports.RawDataService = RawDataService;
exports.RawDataService = RawDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(raw_data_schema_1.RawData.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RawDataService);
//# sourceMappingURL=raw-data.service.js.map