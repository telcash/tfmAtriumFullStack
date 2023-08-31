import { Product } from "../../products/models/product";

/**
 * Interface que modela una categoría de productos
 */
export interface Category {
    id?: number;
    name: string;
    products?: Product[];
}
