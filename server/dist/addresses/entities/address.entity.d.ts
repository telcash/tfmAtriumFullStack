import { Address } from "@prisma/client";
export declare class AddressEntity implements Address {
    constructor(partial: Partial<AddressEntity>);
    userId: number;
    id: number;
    street: string;
    postalCode: string;
    city: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}
