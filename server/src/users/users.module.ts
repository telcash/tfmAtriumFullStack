import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { CartsModule } from 'src/carts/carts.module';

/**
 * Modulo encargado de las funciones de usuarios
 */
@Module({
  imports: [CartsModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
