import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { UpdateCartItemDto } from "src/carts/cart-items/dto/update-cart-item.dto";
export declare class ProductsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private productConditionsForClients;
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(categoryId?: number): Promise<{
        categories: {
            id: number;
            name: string;
        }[];
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllForClients(categoryId?: number, cartId?: number): Promise<({
        cartsItem: {
            quantity: number;
        }[];
        categories: {
            category: {
                name: string;
            };
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        categories: {
            id: number;
            name: string;
        }[];
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneForClients(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateOnCartCheckout(products: UpdateCartItemDto[]): Promise<any[]>;
    rollbackInventory(products: UpdateCartItemDto[]): Promise<any[]>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
