import { CreateCartDto } from './dto/create-cart.dto';
import { CartsRepository } from './carts.repository';
import { CartItemsService } from './cart-items/cart-items.service';
import { StripeService } from 'src/stripe/stripe.service';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
export declare class CartsService {
    private readonly cartsRepository;
    private readonly cartItemsService;
    private readonly productsService;
    private readonly ordersService;
    private readonly stripeService;
    constructor(cartsRepository: CartsRepository, cartItemsService: CartItemsService, productsService: ProductsService, ordersService: OrdersService, stripeService: StripeService);
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
    emptyCart(cartId: number): Promise<{
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
    updateTotal(cartId: number): Promise<number>;
    checkout(checkoutCartDto: CheckoutCartDto): Promise<{
        clientSecret: string;
    }>;
}
