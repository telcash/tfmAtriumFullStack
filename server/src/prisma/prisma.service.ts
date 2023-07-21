import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Servicio que implementa las funciones de conexion a la base de datos con el ORM Prisma
 * Instancia PrismaClient del ORM y realiza la conexión
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    /**
     * Conecta a la base de datos al inicializarse PrismaModule
     */
    async onModuleInit() {
        await this.$connect();
    }
}
