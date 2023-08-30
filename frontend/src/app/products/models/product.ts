import { CartItem } from "src/app/carts/models/cart-item";
import { Category } from "src/app/categories/models/category";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    availability: string;
    image: string;
    categories: Category[];
    cartsItem?: CartItem[];
}
