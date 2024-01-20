import { CreateCartDto } from './dto/create-cart.dto';
import { CartsRepository } from './carts.repository';
import { CartItemsService } from './cart-items/cart-items.service';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartsService {
    private readonly cartsRepository;
    private readonly cartItemsService;
    private readonly productsService;
    private readonly ordersService;
    constructor(cartsRepository: CartsRepository, cartItemsService: CartItemsService, productsService: ProductsService, ordersService: OrdersService);
    create(createCartDto: CreateCartDto): Promise<{
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
    findAll(): Promise<({
        user: {
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
        };
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
    })[]>;
    findOne(id: number): Promise<{
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
    findOneByUserId(userId: number): Promise<{
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
    remove(id: number): Promise<{
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
        addressId: number;
    }>;
    emptyCart(cartId: number): Promise<{
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
    updateTotal(cartId: number): Promise<number>;
    updateMyCart(cartId: number, updateCartDto: UpdateCartDto): Promise<{
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
    checkout(checkoutCartDto: CheckoutCartDto): Promise<number>;
    mergeCarts(userCartId: number, guestCartId: number): Promise<void>;
}
