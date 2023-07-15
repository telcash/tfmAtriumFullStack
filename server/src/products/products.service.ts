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
   * Crea un Producto
   * @param {CreateProductDto} createProductDto - Dto para crear el producto
   * @param {Express.Multer.File} file - Archivo de imagen
   * @returns {Product} - Producto Creado
   */
  async create(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<Product> {
    // Nombre del archivo si hay, sino el nombre es null
    const fileName = file ? file.filename : null;

    // Actualiza el DTO
    createProductDto = {
      ...createProductDto,
      image: fileName,
    }

    // Petición al repositorio para crear el producto
    return await this.productRepository.create(createProductDto);
  }

  async findAll(req): Promise<Product[]> {
    if (req.isAdmin) {
      return await this.productRepository.findAll();
    }
    return await this.productRepository.findAllForClients();
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
