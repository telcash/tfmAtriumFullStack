import { Cart } from "@prisma/client";
export declare class CartEntity implements Cart {
    constructor(partial: Partial<CartEntity>);
    id: number;
    userId: number;
    total: number;
    addressId: number;
    createdAt: Date;
    updatedAt: Date;
}
