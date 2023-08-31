import { Product } from "src/app/products/models/product";

/**
 * Interface que modela un item de una orden
 */
export interface OrderItem {
    quantity: number;
    price: number;
    product: Product;
}