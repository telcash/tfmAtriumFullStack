import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "@prisma/client";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsRepository {
    constructor(private prisma: PrismaService) {} 

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return await this.prisma.product.create({
            data: createProductDto,
        });
    }

    async findAll(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    async findOne(id: number): Promise<Product> {
        return await this.prisma.product.findUnique({
          where: {
            id: id,
          }
        });
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.prisma.product.update({
            data: updateProductDto,
            where: {
                id: id,
            }
        })
    }

    async remove(id: number): Promise<Product> {
        return await this.prisma.product.delete({
            where: {
              id: id
            }
        });
    }

}