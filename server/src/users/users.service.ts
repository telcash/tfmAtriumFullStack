import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

/**
 * Servicio que implementa las funciones de usuario
 */
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    /**
     * Encuentra todos los usuarios en la base de datos
     * @returns {User[]} - Listado de usuarios en la base de datos
     */
    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    /**
     * Encuentra en la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a buscar
     * @returns - Usuario correspondiente
     */
    async findUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                cart: true,
            }
        });
        /* if(!user) {
            throw new BadRequestException("User not found");
        } */
        return user;
    }

    /**
     * Actualiza en la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a actualizar
     * @param {UpdateUserDto} dto - Data transfer object con los datos a actualizar
     * @returns - Usuario actualizado
     */
    async update(email: string, dto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            data: dto,
            where: {
                email: email,
            },
        });
        if(!updatedUser) {
            throw new BadRequestException("User not found");
        }
        return updatedUser;
    }
  
    /**
     * Elimina de la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a eliminar 
     * @returns - Usuario eliminado
     */
    async remove(email: string): Promise<User> {
        const deletedUser = await this.prisma.user.delete({
            where: {
                email: email,
            },
        })
        if(!deletedUser) {
            throw new BadRequestException("User not found");
        }
        return deletedUser;
    }
}
