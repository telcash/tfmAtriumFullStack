import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
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

    /**
     * En caso de un cierre imprevisto de la aplicación realiza la desconexión a la base de datos
     * @param app - Instancia de la aplicación
     */
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
