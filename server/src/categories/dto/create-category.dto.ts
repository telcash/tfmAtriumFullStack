import { Exclude } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsOptional()
    @IsNumber()
    @Exclude({
        toClassOnly: true,
    })
    id: number;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    name: string;
}
