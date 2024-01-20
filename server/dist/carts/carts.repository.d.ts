import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    update(cartId: number, updateCartDto: UpdateCartDto): Promise<{
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
    remove(cartId: number): Promise<{
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
        addressId: number;
    }>;
}
