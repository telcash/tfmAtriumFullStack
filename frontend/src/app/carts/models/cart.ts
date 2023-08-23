import { Address } from "src/app/addresses/models/address";
import { CartItem } from "./cart-item";

export interface Cart {
    id: number;
    userId: number;
    total: number;
    items: CartItem[];
    addressId?: number;
    address?: Address;
}