import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "./constants/user-role";

/**
 * Repositorio para manejar entidades User en la base de datos
 */
@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    /**
     * Crea un usuario en la base de datos
     * @param {CreateUserDto} createUserDto - DTO con los datos del usuario a crear
     * @returns - Usuario creado
     */
    async create(createUserDto: CreateUserDto) {
        return await this.prisma.user.create({
            data: createUserDto,
        });
    }

    /**
     * Busca el listado de todos los usuarios en la base de datos
     * @returns - Listado de usuarios
     */
    async findAll() {
        return await this.prisma.user.findMany();
    }

    /**
     * Busca un usuario en la base de datos según su email
     * @param {string} email - Correo del usuario
     * @returns - Usuario correspondiente al correo
     */
    async findUserByEmail(email: string) {
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
     * Busca un usuario en la base de datos según su id
     * @param {number} id - Id del usuario 
     * @returns  - Usuario correspondiente al id
     */
    async findUserById(id: number) {
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
     * Actualiza los datos de un usuario identificado con su id en la base de datos
     * @param {number} id - Id del usuario
     * @param {UpdateUserDto} updateUserDto - DTO para actualizar
     * @returns - Usuario actualizado
     */
    async update(id: number, updateUserDto: UpdateUserDto) {
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
     * Remueve las ordenes, carritos y direcciones asociadas al usuario
     * @param {number} id - Id del usuario
     * @returns - Usuario removido
     */
    async remove(id: number) {

        const deleteOrders = this.prisma.order.deleteMany({
            where: {
                userId: id,
            }
        });

        const deleteCarts = this.prisma.cart.deleteMany({
            where: {
                userId: id,
            }
        })

        const deleteAddresses = this.prisma.address.deleteMany({
            where: {
                userId: id,
            }
        })

        const deleteUser = this.prisma.user.delete({
            where: {
                id: id,
            }
        })

        const transaction = await this.prisma.$transaction([deleteOrders, deleteCarts, deleteAddresses, deleteUser]);

        return transaction[3];
    }

    /**
     * Cuenta la cantidad de usuarios según rol en la base de datos
     * @param {UserRole} role - Rol de usuario 
     * @returns - Cantidad de usuarios para el rol
     */
    async countUsersByRole(role: UserRole) {
        return await this.prisma.user.count({
            where: {
                role: role,
            }
        });
    }
}