import {
  Controller,
  Post,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RawDataService } from "./raw-data.service";
import csvParser from "csv-parser";
import stream from "stream";
import dayjs from "dayjs";
import multer from "multer";

@Controller("raw-data")
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("files", { storage: multer.memoryStorage() })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const results: any[] = [];
    const readableFile = new stream.Readable();
    readableFile.push(file.buffer);
    readableFile.push(null);

    return new Promise((resolve, reject) => {
      readableFile
        .pipe(csvParser())
        .on("data", (row) => results.push(row))
        .on("end", async () => {
          await this.rawDataService.insertMany(results);
          resolve({ message: "Upload success", inserted: results.length });
        })
        .on("error", reject);
    });
  }

  @Get()
  async getAll() {
    // Endpoint baru untuk melihat semua data yang sudah diupload
    return this.rawDataService.findAll();
  }

  @Get("graph")
  async getGraph(
    @Query("enodebId") enodebId: string,
    @Query("cellId") cellId: string,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) {
    if (!enodebId || !cellId || !startDate || !endDate) {
      throw new BadRequestException(
        "enodebId, cellId, startDate, and endDate are required"
      );
    }

    return this.rawDataService.getGraph(enodebId, cellId, startDate, endDate);
  }
}
