import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RawDataModule } from './raw-data/raw-data.module';

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   process.env.MONGO_URI || 'mongodb://localhost:27017/raw_db',
    // ),
    // RawDataModule,
  ],
})
export class AppModule {}
