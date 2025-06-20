import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const clientOrigin = configService.get<string>('CLIENT_ORIGIN');
  if (!clientOrigin) throw new Error('CLIENT_ORIGIN is not set');

  app.enableCors({
    origin: clientOrigin,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
