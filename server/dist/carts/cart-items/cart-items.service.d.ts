import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemsRepository } from './cart-items.repository';
export declare class CartItemsService {
    private readonly cartItemsRepository;
    constructor(cartItemsRepository: CartItemsRepository);
    upsert(createCartItemDto: CreateCartItemDto): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
    update(updateCartItemDto: UpdateCartItemDto): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(updateCartItemDto: UpdateCartItemDto): Promise<{
        productId: number;
        cartId: number;
        quantity: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeAll(cartId: number): Promise<number>;
}
