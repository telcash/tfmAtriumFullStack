import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';

@Module({
  providers: [AuthService, PasswordService],
  controllers: [AuthController]
})
export class AuthModule {}
