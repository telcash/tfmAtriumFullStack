import { Order } from "@prisma/client";


export class OrderEntity implements Order{
    constructor(partial: Partial<OrderEntity>) {
        Object.assign(this, partial);
    }
    id: number;
    userId: number;
    total: number;
    status: string;
    stripeClientSecret: string;
    addressId: number;
    createdAt: Date;
    updatedAt: Date;
}
