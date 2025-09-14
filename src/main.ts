import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(process.env.PORT ? +process.env.PORT : 3001);
  console.log(`Backend running on port ${process.env.PORT || 3001}`);
}
bootstrap();
