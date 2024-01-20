import { Product } from "@prisma/client";
export declare class ProductEntity implements Product {
    constructor(partial: Partial<ProductEntity>);
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    availability: string;
    createdAt: Date;
    updatedAt: Date;
}
