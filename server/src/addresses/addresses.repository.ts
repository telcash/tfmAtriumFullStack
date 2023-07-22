import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDto } from './dto/create-address.dto';



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
    async findAll() {
        return await this.prisma.address.findMany();
    }

    /**
     * Realiza una busqueda en la base de datos de una dirección, dada su id y el id del usuario al que pertenece
     * @param id 
     * @param userId 
     * @returns 
     */
    async findOne(id: number, userId: number) {
        return await this.prisma.address.findUnique({
            where: {
                id: id,
                userId: userId,
            }
        })
    }


}