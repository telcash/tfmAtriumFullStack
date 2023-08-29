import { Cart } from "@prisma/client";
import { Exclude } from "class-transformer";

/**
 * CartEntity para retornar al cliente que hace el request
 */
export class CartEntity implements Cart{
    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial)
    }

    id: number;
    userId: number;
    total: number;
    addressId: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

}
