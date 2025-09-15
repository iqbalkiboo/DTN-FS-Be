import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { RawDataModule } from "./raw-data/raw-data.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        "mongodb://root:password@localhost:27018/raw_db?readPreference=primary&directConnection=true&ssl=false&authSource=admin"
    ),
    RawDataModule, // pastikan module kamu diimport
  ],
})
export class AppModule {}
