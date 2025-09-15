import { Document } from "mongoose";
export declare class RawData extends Document {
    resultTime: Date;
    enodebId: string;
    cellId: string;
    availDur: number;
}
export declare const RawDataSchema: import("mongoose").Schema<RawData, import("mongoose").Model<RawData, any, any, any, Document<unknown, any, RawData, any, {}> & RawData & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RawData, Document<unknown, {}, import("mongoose").FlatRecord<RawData>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<RawData> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
