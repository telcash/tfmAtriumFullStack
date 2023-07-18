import { Cart, Product, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class CartEntity implements Cart{
    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial)
    }
    id: number;

    userId: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;
    
    products: Product[];

    @Exclude()
    user: User;
}
