import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

/**
 * Bootstrap de la app
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para la configuración de CORS (Actualmente configuración por defecto)
  app.enableCors({
    credentials: true,
    origin: "http://localhost:4200",
  });

  // Validación de los datos en dto recibidos del cliente
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  })
  );

  // Filtrado de datos enviados como respuesta al cliente
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Middleware para parseo de cookies
  app.use(cookieParser(process.env.COOKIE_SECRET));
  

  // Puerto de escucha del servidor
  await app.listen(3000);
}
bootstrap();
