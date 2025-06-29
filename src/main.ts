import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Favo API')
    .setDescription('API para gestionar tareas, usuarios y servicios de Favo')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Tasks')
    .addTag('Proposals')
    .addTag('Messages')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
