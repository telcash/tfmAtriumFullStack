import { Cart } from "@prisma/client";
export declare class CartEntity implements Cart {
    constructor(partial: Partial<CartEntity>);
    id: number;
    userId: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}
