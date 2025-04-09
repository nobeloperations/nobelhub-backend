import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './application/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======
  const config = new DocumentBuilder()
    .setTitle('NobelHub API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix('api/v1');

  app.enableCors({ origin: true });

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
