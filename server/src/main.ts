import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación de los datos en dto recibidos del cliente
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  })
  );

  // Filtrado de datos enviados como respuesta al cliente
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser(process.env.COOKIE_SECRET));
  
  await app.listen(3000);
}
bootstrap();
