import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Prisma } from '@prisma/client';
import { UpdateProductDto } from "./dto/update-product.dto";

/**
 * Repositorio para manejar entidades Product en la base de datos
 */
@Injectable()
export class ProductsRepository {

    constructor(private readonly prisma: PrismaService) {}

    /**
     * Condición para filtrar la busqueda de productos en peticiones de clientes (No ADMIN)
     */
    private productConditionsForClients:Prisma.ProductWhereInput = {
        price: {
            gt: 0,
        },
        image: {
            not: null,
        },
        availability: {
            not: 'NEVER',
        },
        OR: [
            {
                stock: {
                    gt: 0,
                }
            },
            {
                availability: 'ALWAYS',
            }
        ]
    }

    /**
     * Crea un producto en la base de datos
     * @param {CreateProductDto} createProductDto - DTO con los datos para la cración del producto
     * @returns - Producto creado
     */
    async create(createProductDto: CreateProductDto) {
        return await this.prisma.product.create({
            data: createProductDto,
        });
    }

    /**
     * Busca todos los productos en la base de datos
     * @returns - Listado de productos
     */
    async findAll() {
        return await this.prisma.product.findMany();
    }

    /**
     * Busca todos los productos en la base de datos, filtrado con las condiciones para clientes
     * @returns - Listado de productos
     */
    async findAllForClients() {
        return await this.prisma.product.findMany({
            where: this.productConditionsForClients,
        })
    }

    /**
     * Busca un producto en la base de datos por su id único
     * @param {number} id - Id del producto 
     * @returns - Producto buscado
     */
    async findOne(id: number) {
        return await this.prisma.product.findUnique({
          where: {
            id: id,
          },
        });
    }

    /**
     * Busca un producto en la base de datos por su id único, filtrado con las condiciones para clientes
     * @param {number} id - Id del producto
     * @returns - Producto buscado
     */
    async findOneForClients(id: number) {
        return await this.prisma.product.findUnique({
            where: {
                ...this.productConditionsForClients,
                id: id,
              },
        });
    }

    /**
     * Actualiza un producto en la base de datos
     * @param {number} id - Id del producto
     * @param {UpdateProductDto} updateProductDto - DTO con los datos para actualización
     * @returns - Producto actualizado
     */
    async update(id: number, updateProductDto: UpdateProductDto) {
        return await this.prisma.product.update({
            data: updateProductDto,
            where: {
                id: id,
            }
        })
    }

    /**
     * Transacción que actualiza en la base de datos el stock de todos los productos cuando usuario hace checkout
     * @param products - Listado de productos
     * @returns - Transacción
     */
    async updateOnCartCheckout(products) {
        let operations = [];

        for(const product of products) {
            const updateProduct = this.prisma.product.update({
                data: {
                    stock: {
                        decrement: product.quantity,
                    },
                },
                where: {
                    id: product.productId,
                    OR: [
                        {
                            availability: 'ALWAYS'
                        },
                        {
                            AND: [
                                {
                                    stock: {
                                        gte: product.quantity,
                                    }
                                },
                                {
                                    availability: 'STOCK'
                                }
                            ]
                        }
                    ]
                }
            })
            operations.push(updateProduct);
        }
        return await this.prisma.$transaction(operations);
    }

    async rollbackCartCheckout(products) {
        let operations = [];

        for(const product of products) {
            const updateProduct = this.prisma.product.update({
                data: {
                    stock: {
                        increment: product.quantity,
                    },
                },
                where: {
                    id: product.productId,
                }
            })
            operations.push(updateProduct);
        }
        return await this.prisma.$transaction(operations);
    }

    /**
     * Elimina un producto de la base de datos
     * @param {number} id - Id del producto 
     * @returns - Producto eliminado
     */
    async remove(id: number) {
        return await this.prisma.product.delete({
            where: {
              id: id
            }
        });
    }

}