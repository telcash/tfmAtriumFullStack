import { CartItem } from "@prisma/client";
import { Exclude } from "class-transformer";

/**
 * CartItemEntity para retornar
 */
export class CartItemEntity implements CartItem{
    constructor(partial: Partial<CartItemEntity>) {
        Object.assign(this, partial);
    }
    productId: number;
    cartId: number;
    quantity: number;
    price: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

}
