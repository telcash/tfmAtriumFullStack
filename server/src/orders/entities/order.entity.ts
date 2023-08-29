import { Order } from "@prisma/client";

/**
 * OrderEntity para devolver al cliente que hace el request
 */
export class OrderEntity implements Order{
    constructor(partial: Partial<OrderEntity>) {
        Object.assign(this, partial);
    }
    id: number;
    userId: number;
    total: number;
    status: string;
    paymentIntent: string;
    addressId: number;
    createdAt: Date;
    updatedAt: Date;
}
