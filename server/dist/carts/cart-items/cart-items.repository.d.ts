import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
export declare class CartItemsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(cartId: number): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(productId: number, cartId: number): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createCartItemDto: CreateCartItemDto): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(updateCartItemDto: UpdateCartItemDto): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    upsert(createCartItemDto: CreateCartItemDto): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(productId: number, cartId: number): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeAll(cartId: number): Promise<number>;
}
