import { Document } from 'mongoose';
export type RawDataDocument = RawData & Document;
export declare class RawData {
    resultTime: Date;
    enodebId: string;
    cellId: string;
    availDur: Number;
}
export declare const RawDataSchema: import("mongoose").Schema<RawData, import("mongoose").Model<RawData, any, any, any, Document<unknown, any, RawData, any, {}> & RawData & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RawData, Document<unknown, {}, import("mongoose").FlatRecord<RawData>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<RawData> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
