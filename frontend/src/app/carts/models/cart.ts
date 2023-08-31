import { Address } from "src/app/addresses/models/address";
import { CartItem } from "./cart-item";

/**
 * Interface que modela un carrito de compras
 */
export interface Cart {
    id: number;
    userId: number;
    total: number;
    items: CartItem[];
    addressId?: number;
    address?: Address;
}