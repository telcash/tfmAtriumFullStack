import { ProductAvailability } from "../constants/product-availability";


/**
 * Entidad producto para enviar como respuesta al cliente
 * Implementa Product de Prisma
 */
export class ProductEntity {

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
    availability: ProductAvailability;
    createdAt: Date;
    updatedAt: Date;
}
