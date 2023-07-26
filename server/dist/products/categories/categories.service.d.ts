import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    create(createCategoryDto: CreateCategoryDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
