import { Order } from "@prisma/client";
export declare class OrderEntity implements Order {
    constructor(partial: Partial<OrderEntity>);
    id: number;
    userId: number;
    total: number;
    status: string;
    paymentIntent: string;
    addressId: number;
    createdAt: Date;
    updatedAt: Date;
}
