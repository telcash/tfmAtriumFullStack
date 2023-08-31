/**
 * Interface que modela un item en un carrito de compras
 */
export interface CartItem {
    productId: number;
    cartId: number;
    quantity: number;
    price: number;
}
