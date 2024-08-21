import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MongoExceptionFilter } from './helpers/exception-filter.helper';
import * as express from 'express';
import { Request, Response } from 'express'; // Importer les types
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.useGlobalFilters(new MongoExceptionFilter());
  
  await app.listen(3000);
}
bootstrap();
