import { CartItem } from "@prisma/client";

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
    createdAt: Date;
    updatedAt: Date;

}
