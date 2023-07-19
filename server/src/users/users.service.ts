import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Servicio que implementa las funciones de usuario
 */
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository){}

    /**
     * Invoca al repositorio para crear un usuario en la base de datos
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns {User} - Usuario creado
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(createUserDto);
    }

    /**
     * Encuentra todos los usuarios en la base de datos
     * @returns {User[]} - Listado de usuarios en la base de datos
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    /**
     * Encuentra en la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a buscar
     * @returns {User} - Usuario correspondiente
     */
    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findUserByEmail(email);
    }

    /**
     * Actualiza en la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a actualizar
     * @param {UpdateUserDto} updateUserDto - Data transfer object con los datos a actualizar
     * @returns {User} - Usuario actualizado
     */
    async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userRepository.update(email, updateUserDto);
    }
  
    /**
     * Elimina de la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a eliminar 
     * @returns {User} - Usuario eliminado
     */
    async remove(email: string): Promise<User> {
        return await this.userRepository.remove(email);
    }

    /**
     * Determina la cantidad de usuarios por rol
     * @param {Role} role - Rol de usuario
     * @returns {number} - Cantidad
     */
    async countUsersByRole(role: Role): Promise<number> {
        return await this.userRepository.countUsersByRole(role);
    }

}
