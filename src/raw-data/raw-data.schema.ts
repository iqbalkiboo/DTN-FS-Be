import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, collection: "raw_data" })
export class RawData extends Document {
  @Prop({ required: true })
  resultTime: Date;

  @Prop({ required: true })
  enodebId: string;

  @Prop({ required: true })
  cellId: string;

  @Prop({ required: true })
  availDur: number;
}

export const RawDataSchema = SchemaFactory.createForClass(RawData);

// Tambahkan unique compound index
RawDataSchema.index(
  { resultTime: 1, enodebId: 1, cellId: 1 },
  { unique: true }
);
