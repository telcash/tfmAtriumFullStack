import { Address } from "@prisma/client";
import { Exclude } from "class-transformer";


/**
 * AddressEntity para devolver al cliente que hace el request
 */
export class AddressEntity implements Address {
    constructor(partial: Partial<AddressEntity>) {
        Object.assign(this, partial)
    }
    userId: number;

    @Exclude()
    id: number;

    street: string;
    postalCode: string;
    city: string;
    country: string;

    @Exclude()
    createdAt: Date;
    
    @Exclude()
    updatedAt: Date;
}
