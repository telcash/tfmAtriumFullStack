import { Availability } from "@prisma/client";

export class CreateProductDto {
    name: string;
    description: string;
    price?: number;
    image: string;
    stock?: number;
    availability?: Availability;
}
