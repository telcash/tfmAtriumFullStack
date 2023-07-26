import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
export declare class CartItemsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(cartId: number): Promise<{
        productId: number;
        quantity: number;
    }[]>;
    create(createCartItemDto: CreateCartItemDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(updateCartItemDto: UpdateCartItemDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(productId: number, cartId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    removeAll(cartId: number): Promise<number>;
}
