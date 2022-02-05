import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundInterceptor } from './interceptors/EntityNotFoundInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new EntityNotFoundInterceptor());
  await app.listen(3000);
}
bootstrap();
