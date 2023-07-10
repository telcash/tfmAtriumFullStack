import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      data: updateProductDto,
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
    return deletedProduct;
  }
}
