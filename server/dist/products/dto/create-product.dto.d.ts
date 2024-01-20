import { ProductAvailability } from "../constants/product-availability";
export declare class CreateProductDto {
    name: string;
    description: string;
    price?: number;
    image?: string;
    stock?: number;
    availability?: ProductAvailability;
}
