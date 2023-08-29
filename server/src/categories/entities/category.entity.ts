import { Category } from "@prisma/client";

/**
 * CategoryEntity para devolver al cliente que hace el request
 */
export class CategoryEntity implements Category {
    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial);
    }

    id: number;
    name: string;
}
