import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ProductsModule } from './products/products.module';
import { StorageService } from './common/services/storage.service';

/**
 * Modulo raiz de la app
 */
@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }), PrismaModule, AuthModule, UsersModule, ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    StorageService
    ,
  ],
})
export class AppModule {}
