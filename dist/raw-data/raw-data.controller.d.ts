import { RawDataService } from "./raw-data.service";
export declare class RawDataController {
    private readonly rawDataService;
    constructor(rawDataService: RawDataService);
    uploadFile(file: Express.Multer.File): Promise<unknown>;
    getAll(): Promise<(import("mongoose").FlattenMaps<import("./raw-data.schema").RawData> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[]>;
    getGraph(enodebId: string, cellId: string, startDate: string, endDate: string): Promise<{
        resultTime: Date;
        availability: number;
    }[]>;
}
