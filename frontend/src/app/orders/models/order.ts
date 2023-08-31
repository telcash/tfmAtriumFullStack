import { Address } from "src/app/addresses/models/address";
import { OrderItem } from "./order-item";
import { User } from "src/app/auth/models/user";

/**
 * Interface que modela una orden de usuario
 */
export interface Order {
    id: number;
    userId: number;
    total: number;
    addressId: number;
    status: string;
    createdAt: Date;
    address?: Address,
    items?: OrderItem[];
    user?: User;
}
