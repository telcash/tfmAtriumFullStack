import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StorageService } from 'src/common/services/storage.service';
import { ProductsRepository } from './products.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository, private storageService: StorageService) {}

  /**
   * 
   * @param createProductDto 
   * @param file 
   * @returns 
   */
  async create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    const fileName = file ? file.filename : null;
    createProductDto = {
      ...createProductDto,
      image: fileName,
    }
    return await this.productRepository.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto, file: Express.Multer.File): Promise<Product> {
    if (file) {
      updateProductDto = {
        ...updateProductDto,
        image: file.filename,
      }
      const oldImage = (await this.productRepository.findOne(id)).image;
      if (oldImage) {
        this.storageService.deleteFile(this.storageService.imagesDestination, oldImage);
      }
    }
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.productRepository.remove(id);

    if (product && product.image) {
      this.storageService.deleteFile(this.storageService.imagesDestination, product.image);
    }
    return product;
  }
}
