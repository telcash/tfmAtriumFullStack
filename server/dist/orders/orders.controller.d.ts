import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
    findOne(id: string): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        status: string;
        stripeClientSecret: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    findOneForUser(id: string, userId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
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
