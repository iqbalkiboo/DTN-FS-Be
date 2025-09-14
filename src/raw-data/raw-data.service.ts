import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawData, RawDataDocument } from './raw-data.schema';

@Injectable()
export class RawDataService {
  private readonly logger = new Logger(RawDataService.name);
  constructor(
    @InjectModel(RawData.name) private rawModel: Model<RawDataDocument>,
  ) {}

  async insertManyUnique(docs: Partial<RawData>[]) {
    // Insert one by one with upsert to avoid duplicates (unique index helps)
    const results = [];
    for (const doc of docs) {
      try {
        const res = await this.rawModel
          .updateOne(
            {
              enodebId: doc.enodebId,
              cellId: doc.cellId,
              resultTime: doc.resultTime,
            },
            { $setOnInsert: doc },
            { upsert: true },
          )
          .exec();
        // results.push(res);
      } catch (err) {
        // log but continue
        this.logger.error('Insert error: ' + err.message);
      }
    }
    return results;
  }

  async queryGraph(
    enodebId: string,
    cellId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const filter: any = {};
    if (enodebId) filter.enodebId = enodebId;
    if (cellId) filter.cellId = cellId;
    if (startDate || endDate) filter.resultTime = {};
    if (startDate) filter.resultTime.$gte = startDate;
    if (endDate) filter.resultTime.$lte = endDate;

    const docs = await this.rawModel
      .find(filter)
      .sort({ resultTime: 1 })
      .lean()
      .exec();
    return docs.map((d) => ({
      resultTime: d.resultTime,
      // availability: (d.availDur / 900) * 100,
    }));
  }
}
