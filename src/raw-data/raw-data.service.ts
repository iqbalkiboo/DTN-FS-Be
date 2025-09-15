import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RawData } from "./raw-data.schema";
import dayjs from "dayjs";

@Injectable()
export class RawDataService {
  constructor(
    @InjectModel(RawData.name) private rawDataModel: Model<RawData>
  ) {}

  async findAll() {
    return this.rawDataModel.find().lean();
  }

  async insertMany(rows: any[]) {
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

  async getGraph(
    enodebId: string,
    cellId: string,
    startDate: string,
    endDate: string
  ) {
    const start = dayjs(
      startDate,
      ["YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ"],
      true
    );
    const end = dayjs(endDate, ["YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ"], true);

    if (!start.isValid() || !end.isValid()) {
      throw new BadRequestException(
        "Invalid date format. Use YYYY-MM-DD or ISO string."
      );
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
}
