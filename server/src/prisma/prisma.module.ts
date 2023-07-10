import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Modulo encargado de la conexion a la base de datos
 * Usa el ORM Prisma
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
