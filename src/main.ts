import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors(
    {
      origin: "hhttp://localhost:3000",
      Credential: false,
    }
  );
  Logger.log(`Application listening on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
