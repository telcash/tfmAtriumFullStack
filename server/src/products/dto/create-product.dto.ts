import { Availability } from "@prisma/client";

export class CreateProductDto {
    name: string;
    description: string;
    price?: number;
    stock?: number;
    image?: string;
    availability?: Availability;
}
