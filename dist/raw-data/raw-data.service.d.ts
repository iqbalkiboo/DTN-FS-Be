import { Model } from "mongoose";
import { RawData } from "./raw-data.schema";
export declare class RawDataService {
    private rawDataModel;
    constructor(rawDataModel: Model<RawData>);
    findAll(): Promise<(import("mongoose").FlattenMaps<RawData> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[]>;
    insertMany(rows: any[]): Promise<import("mongoose").MongooseBulkWriteResult>;
    getGraph(enodebId: string, cellId: string, startDate: string, endDate: string): Promise<{
        resultTime: Date;
        availability: number;
    }[]>;
}
