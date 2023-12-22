import './config/aliases';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

function enableCors(app: INestApplication) {
  app.enableCors();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder().setTitle('cookie auth example').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  enableCors(app);
  await app.listen(3333);
}
bootstrap();
