import { Exclude } from "class-transformer";
import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";

/**
 * CartEntity para retornar al cliente que hace el request
 */
export class CartEntity {
    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial)
    }
    id: number;

    userId: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;
    
    products: ProductEntity[];

    @Exclude()
    user: UserEntity;
}
