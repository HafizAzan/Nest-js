import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { AllExceptionsFilter } from './all.exeption';
import * as path from 'path';
import * as process from 'process';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(bodyParser.json({ limit: '1000mb' }));
  app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })),
    app.useStaticAssets(path.join(__dirname, '../uploads'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.setViewEngine('hbs');
  const PORT = process.env.PORT || 7000;
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
