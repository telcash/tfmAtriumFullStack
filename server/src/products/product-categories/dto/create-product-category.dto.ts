import { IsNumber, Min } from "class-validator";

export class CreateProductCategoryDto {
    @IsNumber()
    @Min(1)
    productId: number;

    @IsNumber()
    @Min(1)
    categoryId: number;
}
