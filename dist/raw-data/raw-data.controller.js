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
exports.RawDataController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const raw_data_service_1 = require("./raw-data.service");
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = __importDefault(require("stream"));
const multer_1 = __importDefault(require("multer"));
let RawDataController = class RawDataController {
    rawDataService;
    constructor(rawDataService) {
        this.rawDataService = rawDataService;
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException("No file uploaded");
        }
        const results = [];
        const readableFile = new stream_1.default.Readable();
        readableFile.push(file.buffer);
        readableFile.push(null);
        return new Promise((resolve, reject) => {
            readableFile
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => results.push(row))
                .on("end", async () => {
                await this.rawDataService.insertMany(results);
                resolve({ message: "Upload success", inserted: results.length });
            })
                .on("error", reject);
        });
    }
    async getAll() {
        return this.rawDataService.findAll();
    }
    async getGraph(enodebId, cellId, startDate, endDate) {
        return this.rawDataService.getGraph(enodebId, cellId, startDate, endDate);
    }
};
exports.RawDataController = RawDataController;
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("files", { storage: multer_1.default.memoryStorage() })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RawDataController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RawDataController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("graph"),
    __param(0, (0, common_1.Query)("enodebId")),
    __param(1, (0, common_1.Query)("cellId")),
    __param(2, (0, common_1.Query)("startDate")),
    __param(3, (0, common_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], RawDataController.prototype, "getGraph", null);
exports.RawDataController = RawDataController = __decorate([
    (0, common_1.Controller)("raw-data"),
    __metadata("design:paramtypes", [raw_data_service_1.RawDataService])
], RawDataController);
//# sourceMappingURL=raw-data.controller.js.map