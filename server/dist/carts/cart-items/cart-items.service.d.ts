import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemsRepository } from './cart-items.repository';
export declare class CartItemsService {
    private readonly cartItemsRepository;
    constructor(cartItemsRepository: CartItemsRepository);
    create(createCartItemDto: CreateCartItemDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAll(cartId: number): Promise<{
        productId: number;
        quantity: number;
    }[]>;
    update(updateCartItemDto: UpdateCartItemDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(updateCartItemDto: UpdateCartItemDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    removeAll(cartId: number): Promise<number>;
}
