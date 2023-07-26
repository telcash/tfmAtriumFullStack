import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCartDto: CreateCartDto): Promise<{
        products: (import("@prisma/client/runtime/library").GetResult<{
            productId: number;
            cartId: number;
            quantity: number;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAll(): Promise<({
        user: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            role: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            mobile: string;
            refreshToken: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        products: (import("@prisma/client/runtime/library").GetResult<{
            productId: number;
            cartId: number;
            quantity: number;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<{
        products: (import("@prisma/client/runtime/library").GetResult<{
            productId: number;
            cartId: number;
            quantity: number;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findOneByUserId(userId: number): Promise<{
        products: (import("@prisma/client/runtime/library").GetResult<{
            productId: number;
            cartId: number;
            quantity: number;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(cartId: number, updateCartDto: UpdateCartDto): Promise<{
        products: (import("@prisma/client/runtime/library").GetResult<{
            productId: number;
            cartId: number;
            quantity: number;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
