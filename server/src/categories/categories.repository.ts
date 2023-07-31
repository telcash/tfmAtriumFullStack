import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesRepository {

    constructor(private readonly prisma: PrismaService) {}

    /**
     * Crea una categoría en la base de datos
     * @param {CreateCategoryDto} createCategoryDto - Dto con los datos de la categoría a crear
     * @returns - Categoria creada
     */
    async create(createCategoryDto: CreateCategoryDto) {
        return await this.prisma.category.create({
            data: createCategoryDto,
        })
    }

    /**
     * Busca en la base de datos todas las categorías
     * @returns - Listado de categorías
     */
    async findAll() {
        return await this.prisma.address.findMany();
    }

    /**
     * Busca en la base de datos una categoría por su id
     * @param {number} id - Id de la categoría
     * @returns - Categoría buscada
     */
    async findOne(id: number) {
        return await this.prisma.address.findUnique({
            where: {
                id: id,
            }
        })
    }

    /**
     * Actualiza en la base de datos una categoría
     * @param {number} id - Id de la categoría 
     * @param {UpdateCategoryDto} updateCategoryDto - Dto con los datos a actualizar
     * @returns - Categoría actualizada
     */
    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return await this.prisma.address.update({
            data: updateCategoryDto,
            where: {
                id: id,
            }
        })
    }

    /**
     * Borra de la base de datos una categoría
     * @param {number} id - Id de la categoría 
     * @returns - Categoría eliminada
     */
    async remove(id: number) {
        return await this.prisma.address.delete({
            where: {
                id: id,
            }
        })
    }
}