import { Injectable } from "@nestjs/common";
import { UserRole, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

/**
 * Repositorio para manejar entidades User en la base de datos
 */
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
     * Busca un usuario según su id único
     * @param {number} id - Id del usuario 
     * @returns {User} - Usuario correspondiente al id
     */
    async findUserById(id: number): Promise<User> {
        return await this.prisma.user.findUniqueOrThrow({
            where: {
                id: id,
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
     * @param {number} id - Id del usuario
     * @param {UpdateUserDto} updateUserDto - DTO para actualizar
     * @returns {User} - Usuario actualizado
     */
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({
            data: updateUserDto,
            where: {
                id: id,
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
     * @param {number} id - Correo del usuario
     * @returns {User} - Usuario removido
     */
    async remove(id: number): Promise<User> {
        return await this.prisma.user.delete({
            where: {
                id: id,
            },
        });
    }

    /**
     * Cuenta la cantidad de usuarios por rol
     * @param {UserRole} role - Rol de usuario 
     * @returns - Cantidad
     */
    async countUsersByRole(role: UserRole): Promise<number>{
        return await this.prisma.user.count({
            where: {
                role: role,
            }
        });
    }
}