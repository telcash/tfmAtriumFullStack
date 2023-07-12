import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/common/services/storage.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService, private storageService: StorageService) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const fileName = file ? file.filename : null;
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        image: fileName,
      }
    });
    return product;
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      }
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, file: Express.Multer.File) {
    let data = updateProductDto;
    if (file) {
      const oldImage = (await this.findOne(id)).image;
      if (oldImage) {
        this.storageService.deleteFile(this.storageService.imagesDestination, oldImage);
      }
      data = {
        ...data,
        image: file.filename,
      }
    }

    const updatedProduct = await this.prisma.product.update({
      data: data,
      where: {
        id: id,
      },
    });
    return updatedProduct;
  }

  async remove(id: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id: id
      }
    });

    if (deletedProduct && deletedProduct.image) {
      this.storageService.deleteFile(this.storageService.imagesDestination, deletedProduct.image);
    }
    return deletedProduct;
  }
}
