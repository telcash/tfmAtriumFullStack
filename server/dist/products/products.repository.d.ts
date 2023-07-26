import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private productConditionsForClients;
    create(createProductDto: CreateProductDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findAllForClients(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findOneForClients(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    updateOnCartCheckout(products: any): Promise<any[]>;
    rollbackCartCheckout(products: any): Promise<any[]>;
    remove(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
