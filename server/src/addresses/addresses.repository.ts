import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from "./dto/update-address.dto";



@Injectable()
export class AddressesRepository {

    constructor(private readonly prisma: PrismaService) {}

    /**
     * Crea una nueva dirección en la base de datos
     * @param createAddressDto - Dto para la creación de la base de datos
     * @returns - Dirección creada
     */
    async create(createAddressDto: CreateAddressDto) {
        return await this.prisma.address.create({
            data: createAddressDto,
        })
    }

    /**
     * Realiza una busqueda de todas las direcciones en la base de datos
     * @returns - Listado de todas las direcciones
     */
    async findAll(userId: number) {
        return await this.prisma.address.findMany({
            where: {
                userId: userId,
            }
        });
    }

    /**
     * Realiza una busqueda en la base de datos de una dirección, dada su id y el id del usuario al que pertenece
     * @param {number} id - Id de la dirección
     * @param {number} userId - id del usuario
     * @returns - Dirección buscada
     */
    async findOne(id: number, userId: number) {
        return await this.prisma.address.findUnique({
            where: {
                id: id,
                userId: userId,
            }
        })
    }

    /**
     * Actualiza en la base de datos una dirección, dada su id y el id del usuario a la que pertenece
     * @param id - Id de la dirección
     * @param userId - Id del usuario
     * @param updateAddressDto - Dto con los datos para actualización de la dirección
     * @returns - Dirección actualizada
     */
    async update(id: number, userId: number, updateAddressDto: UpdateAddressDto) {
        return await this.prisma.address.update({
            data: updateAddressDto,
            where: {
                id: id,
                userId: userId,
            }
        })
    }

    /**
     * 
     * @param {number} id - Id de la dirección
     * @param {number} userId - Id del usuario
     * @returns - Dirección eliminada
     */
    async remove(id: number, userId: number) {
        return await this.prisma.address.delete({
            where: {
                id: id,
                userId: userId,
            }
        })
    }


}