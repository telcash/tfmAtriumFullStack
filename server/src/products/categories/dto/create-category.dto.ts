import { Exclude } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsOptional()
    @IsNumber()
    @Exclude({
        toClassOnly: true,
    })
    id: number;

    @IsString()
    @MinLength(20)
    name: string;
}
