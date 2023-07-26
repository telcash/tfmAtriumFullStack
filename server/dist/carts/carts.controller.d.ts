import { CartsService } from './carts.service';
import { CartEntity } from './entities/cart.entity';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    findAll(): Promise<CartEntity[]>;
    findMyCart(cart: any): Promise<CartEntity>;
    emptyCart(cart: any): Promise<CartEntity>;
    checkout(checkoutCartDto: CheckoutCartDto): Promise<{
        clientSecret: string;
    }>;
    findOne(id: string): Promise<{
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
