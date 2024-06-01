import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  // await app.init()
  PassportModule.register(app)

  const config = new DocumentBuilder()
      .setTitle('Test Task API')
      .setDescription('This API is made for test task')
      .setVersion('1.0')
      .addTag('API')
      .addBearerAuth()
      .build()
    
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
