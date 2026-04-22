import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // ✅ Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Conversation API')
    .setDescription('API for managing conversation sessions & events')
    .setVersion('1.0')
    .addTag('sessions')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document); 
  // 👉 open: http://localhost:3000/api

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  console.log(`Server running on port ${port}`);
  console.log(`Swagger running on http://localhost:${port}/api`);
}
bootstrap();