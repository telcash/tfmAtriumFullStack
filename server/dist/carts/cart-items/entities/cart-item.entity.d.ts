import { CartItem } from "@prisma/client";
export declare class CartItemEntity implements CartItem {
    constructor(partial: Partial<CartItemEntity>);
    productId: number;
    cartId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
