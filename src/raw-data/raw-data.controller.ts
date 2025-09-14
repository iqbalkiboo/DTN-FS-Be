import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';
import * as streamifier from 'streamifier';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RawDataService } from './raw-data.service';
import { parse } from 'csv-parse/sync';

@Controller()
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  // Upload endpoint: POST /upload , form-data field "files" (multi)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  // async upload(@UploadedFiles() files: Express.Multer.File[]) {
  //   if (!files || files.length === 0) {
  //     throw new BadRequestException('No files uploaded');
  //   }

  //   const allDocs = [];

  //   for (const file of files) {
  //     const content = file.buffer.toString('utf8');

  //     // Try to parse CSV with header auto-detect
  //     let records: any[] = [];
  //     try {
  //       records = parse(content, {
  //         columns: true,
  //         skip_empty_lines: true,
  //         trim: true,
  //       });
  //     } catch (err) {
  //       // if parse fails, continue to next file
  //       console.error('CSV parse error', err);
  //       continue;
  //     }

  //     for (const row of records) {
  //       // Expected columns: "Result Time", "Object Name", "L.Cell.Avail.Dur"
  //       const resultTimeRaw =
  //         row['Result Time'] ?? row['ResultTime'] ?? row['Result_Time'];
  //       const objectName =
  //         row['Object Name'] ?? row['ObjectName'] ?? row['Object_Name'];
  //       const availDurRaw =
  //         row['L.Cell.Avail.Dur'] ??
  //         row['L.Cell.Avail.Dur '] ??
  //         row['L.Cell.Avail.Dur'];

  //       if (
  //         !resultTimeRaw ||
  //         !objectName ||
  //         typeof availDurRaw === 'undefined'
  //       ) {
  //         // skip if required columns not present in row
  //         continue;
  //       }

  //       const resultTime = new Date(resultTimeRaw);
  //       if (isNaN(resultTime.getTime())) continue;

  //       // parse objectName to extract eNodeB ID and Local Cell ID
  //       const enodebMatch = objectName.match(/eNodeB ID\s*=\s*([0-9]+)/i);
  //       const cellIdMatch = objectName.match(/Local Cell ID\s*=\s*([0-9]+)/i);

  //       // fallback patterns (sometimes different separators)
  //       const enodebMatch2 =
  //         enodebMatch ?? objectName.match(/eNodeB ID[:=]\s*([0-9]+)/i);
  //       const cellIdMatch2 =
  //         cellIdMatch ?? objectName.match(/Local Cell ID[:=]\s*([0-9]+)/i);

  //       const enodebId = enodebMatch2 ? enodebMatch2[1] : null;
  //       const cellId = cellIdMatch2 ? cellIdMatch2[1] : null;

  //       if (!enodebId || !cellId) continue;

  //       const availDur = parseInt(
  //         String(availDurRaw).replace(/[^0-9\-]/g, ''),
  //         10,
  //       );
  //       if (isNaN(availDur)) continue;

  //       // allDocs.push({
  //       //   resultTime,
  //       //   enodebId: String(enodebId),
  //       //   cellId: String(cellId),
  //       //   availDur,
  //       // });
  //     }
  //   }

  //   // insert docs ensuring uniqueness
  //   const res = await this.rawDataService.insertManyUnique(allDocs);
  //   return { inserted: allDocs.length, details: res.length };
  // }

  // Get Graph endpoint: GET /graph?enodebId=...&cellId=...&startDate=...&endDate=...
  @Get('graph')
  async getGraph(
    @Query('enodebId') enodebId: string,
    @Query('cellId') cellId: string,
    @Query('startDate') startDateStr: string,
    @Query('endDate') endDateStr: string,
  ) {
    let startDate: Date | undefined, endDate: Date | undefined;
    if (startDateStr) {
      startDate = new Date(startDateStr);
      if (isNaN(startDate.getTime())) {
        throw new BadRequestException('Invalid startDate');
      }
    }
    if (endDateStr) {
      endDate = new Date(endDateStr);
      if (isNaN(endDate.getTime())) {
        throw new BadRequestException('Invalid endDate');
      }
    }

    // const data = await this.rawDataService.queryGraph(
    //   enodebId,
    //   cellId,
    //   startDate,
    //   endDate,
    // );
    // return data;
  }
}
