import { Model } from 'mongoose';
import { RawData, RawDataDocument } from './raw-data.schema';
export declare class RawDataService {
    private rawModel;
    private readonly logger;
    constructor(rawModel: Model<RawDataDocument>);
    insertManyUnique(docs: Partial<RawData>[]): Promise<never[]>;
    queryGraph(enodebId: string, cellId: string, startDate: Date, endDate: Date): Promise<{
        resultTime: Date;
    }[]>;
}
