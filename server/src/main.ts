import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación de los datos en dto recibidos del cliente
  app.useGlobalPipes(new ValidationPipe());

  // Filtrado de datos enviados como respuesta al cliente
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  await app.listen(3000);
}
bootstrap();
