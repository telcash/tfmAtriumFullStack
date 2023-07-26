import { Category } from "@prisma/client";
export declare class CategoryEntity implements Category {
    constructor(partial: Partial<CategoryEntity>);
    id: number;
    name: string;
}
