import { Cart, CartStatus } from "@prisma/client";

export class CartEntity implements Cart {
    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial)
    }

    id: number;
    userId: number;
    status: CartStatus;
    createdAt: Date;
    updatedAt: Date;
}
