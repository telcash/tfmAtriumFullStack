import { CartsService } from './carts.service';
import { CartEntity } from './entities/cart.entity';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    findAll(): Promise<CartEntity[]>;
    findMyCart(cart: any): Promise<CartEntity>;
    updateMyCart(cart: any, updateCartDto: UpdateCartDto): Promise<CartEntity>;
    emptyCart(cart: any): Promise<CartEntity>;
    checkout(checkoutCartDto: CheckoutCartDto): Promise<number>;
    findOne(id: string): Promise<{
        address: {
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        };
        items: {
            productId: number;
            cartId: number;
            quantity: number;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
        addressId: number;
    }>;
}
