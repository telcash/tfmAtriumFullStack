import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

/**
 * Modulo encargado de las funciones de Autenticación y Autorización de usuarios
 */
@Module({
  imports: [
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
