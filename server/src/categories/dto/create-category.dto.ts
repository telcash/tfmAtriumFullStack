import { Exclude } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsOptional()
    @IsNumber()
    @Exclude({
        toClassOnly: true,
    })
    id: number;

    @IsString()
    @MaxLength(20)
    name: string;
}
