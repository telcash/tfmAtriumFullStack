import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    /**
     * Crea un usuario en la base de datos
     * @param {CreateUserDto} createUserDto 
     * @returns {User} - Usuario creado
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({
            data: createUserDto,
        })
    }

    /**
     * Busca el listado de usuarios en la base de datos
     * @returns {User[]} - Listado de usuarios
     */
    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    /**
     * Busca un usuario según su correo(único)
     * @param {string} email - Correo del usuario
     * @returns {User} - Usuario correspondiente al correo
     */
    async findUserByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
            include: {
                addresses: true,
                orders: true,
                cart: true,
            },
        });
    }

    /**
     * Actualiza los datos de un usuario en la base de datos
     * @param {string} email - Correo del usuario
     * @param {UpdateUserDto} updateUserDto - DTO para actualizar
     * @returns {User} - Usuario actualizado
     */
    async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({
            data: updateUserDto,
            where: {
                email: email,
            },
            include: {
                addresses: true,
                orders: true,
                cart: true,
            },
        });
    }

    /**
     * Remueve un usuario de la base de datos
     * @param {string} email - Correo del usuario
     * @returns {User} - Usuario removido
     */
    async remove(email: string): Promise<User> {
        return await this.prisma.user.delete({
            where: {
                email: email,
            },
        })
    }
}