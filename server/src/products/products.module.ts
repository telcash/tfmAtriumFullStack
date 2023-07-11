import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { StorageService } from 'src/common/services/storage.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, StorageService],
})
export class ProductsModule {}
