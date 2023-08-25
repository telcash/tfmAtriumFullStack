import { Address } from "src/app/addresses/models/address";
import { OrderItem } from "./order-item";

export interface Order {
    id: number;
    userId: number;
    total: number;
    addressId: number;
    status: string;
    createdAt: Date;
    address?: Address,
    items?: OrderItem[];
}
