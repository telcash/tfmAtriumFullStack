import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createOrderDto: CreateOrderDto, products) {
        return await this.prisma.order.create({
            data: {
                addressId: createOrderDto.addressId,
                status: createOrderDto.status,
                total: createOrderDto.total,
                userId: createOrderDto.userId,
                products: {
                    create: products,
                }
            }
        })
    }
}