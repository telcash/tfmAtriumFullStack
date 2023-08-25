import { Product } from "src/app/products/models/product";


export interface OrderItem {
    quantity: number;
    price: number;
    product: Product;
}