import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrdersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto, items: any): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAllForUser(userId: number): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOneForUser(id: number, userId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
