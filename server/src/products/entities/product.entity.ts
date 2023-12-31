import { Product } from "@prisma/client";
import { Exclude } from "class-transformer";

/**
 * Entidad producto para enviar como respuesta al cliente
 * Implementa Product de Prisma
 */
export class ProductEntity implements Product {

    /**
     * Genera una entidad de la clase con cualquier parcial de ella
     * @param partial 
     */
    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial);
    }
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    availability: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;
}
