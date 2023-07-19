


/**
 * CartItemEntity para retornar
 */
export class CartItemEntity {
    constructor(partial: Partial<CartItemEntity>) {
        Object.assign(this, partial)
    }

    productId: number;
    cartId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;    
}
