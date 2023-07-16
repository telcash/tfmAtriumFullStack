import { Cart } from "@prisma/client";

export class CartEntity implements Cart {
    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial)
    }

    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
