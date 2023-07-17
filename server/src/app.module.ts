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
import { CartsModule } from './carts/carts.module';
import { PrismaExceptionFilter } from './prisma/filters/prisma.filter/prisma-exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from './common/common.module';

/**
 * Modulo raiz de la app
 */
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }), PrismaModule, AuthModule, UsersModule, ProductsModule, CartsModule, CommonModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    /* {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    }, */
  ],
})
export class AppModule {}
