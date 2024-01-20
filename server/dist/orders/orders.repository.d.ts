import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrdersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto, items: any): Promise<{
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        user: {
            firstName: string;
            lastName: string;
            email: string;
            mobile: string;
        };
        address: {
            street: string;
            postalCode: string;
            city: string;
            country: string;
        };
        items: {
            product: {
                id: number;
                name: string;
                price: number;
            };
            quantity: number;
            price: number;
        }[];
    } & {
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        user: {
            firstName: string;
            lastName: string;
            email: string;
            mobile: string;
        };
        address: {
            street: string;
            postalCode: string;
            city: string;
            country: string;
        };
        items: {
            product: {
                id: number;
                name: string;
                image: string;
            };
            quantity: number;
            price: number;
        }[];
    } & {
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllForUser(userId: number): Promise<({
        address: {
            street: string;
            postalCode: string;
            city: string;
            country: string;
        };
        items: {
            product: {
                id: number;
                name: string;
                image: string;
            };
            quantity: number;
            price: number;
        }[];
    } & {
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOneForUser(id: number, userId: number): Promise<{
        address: {
            street: string;
            postalCode: string;
            city: string;
            country: string;
        };
        items: {
            product: {
                id: number;
                name: string;
                image: string;
            };
            quantity: number;
            price: number;
        }[];
    } & {
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateOneForUser(id: number, userId: number, updateOrderDto: UpdateOrderDto): Promise<{
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeOneForUser(id: number, userId: number): Promise<{
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByPaymentIntent(paymentIntent: string): Promise<{
        id: number;
        userId: number;
        total: number;
        paymentIntent: string;
        status: string;
        addressId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
