import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';


/**
 * Bootstrap de la app
 */
async function bootstrap() {

  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.setGlobalPrefix('api');

  // Middleware para la configuración de CORS
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });

  
  // Middleware para parseo de cookies
  app.use(cookieParser(process.env.COOKIE_SECRET));
  
  // Validación de los datos en DTOs recibidos del cliente
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  })
  );

  // Filtrado de datos enviados como respuesta al cliente
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  

  // Puerto de escucha del servidor
  await app.listen(process.env.SERVER_PORT);

}
bootstrap();

