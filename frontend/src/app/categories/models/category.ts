import { Product } from "../../products/models/product";

export interface Category {
    id: number;
    name: string;
    products: Product[];
}
