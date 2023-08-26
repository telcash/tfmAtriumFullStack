import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import { ShutdownObserver } from './common/services/shutdownobserver.service';

/**
 * Bootstrap de la app
 */
async function bootstrap() {

  /* const server = express()
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  )

  app.enableCors({
    credentials: true,
    origin: "http://localhost:4200",
  });
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  app.use(cookieParser(process.env.COOKIE_SECRET));
  
  app.enableShutdownHooks();

  await app.init();
  const mainServer = http.createServer(server).listen(3000);
  const stripeServer = http.createServer(server).listen(4242);

  const shutdownObserver = app.get(ShutdownObserver);
  shutdownObserver.addHttpServer(mainServer);
  shutdownObserver.addHttpServer(stripeServer); */

  const app = await NestFactory.create(AppModule, { rawBody: true });

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

