import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { StorageService } from 'src/common/services/storage.service';
import { ProductsRepository } from './products.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, StorageService],
})
export class ProductsModule {}
