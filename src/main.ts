import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors(
    {
      origin: "http://localhost:3000",
      credentials: false,
    }
  );
  await app.listen(process.env.PORT ?? 3000);
 
  Logger.log(`Application listening on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
