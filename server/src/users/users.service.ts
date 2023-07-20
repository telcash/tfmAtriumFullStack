import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRole } from './constants/user-role';

/**
 * Servicio que implementa las funciones de usuario
 */
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository){}

    /**
     * Invoca al repositorio para crear un usuario en la base de datos
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns  - Usuario creado
     */
    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.create(createUserDto);
    }

    /**
     * Encuentra todos los usuarios en la base de datos
     * @returns  - Listado de usuarios en la base de datos
     */
    async findAll() {
        return await this.userRepository.findAll();
    }

    /**
     * Busca  en la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a buscar
     * @returns - Usuario correspondiente
     */
    async findUserByEmail(email: string) {
        return await this.userRepository.findUserByEmail(email);
    }
    
    /**
     * Busca en la base de datos el usuario correspondiente a un id
     * @param {number} id - Id del usuario
     * @returns  - Usuario buscado
     */
    async findUserById(id: number) {
        return await this.userRepository.findUserById(id);
    }

    /**
     * Actualiza en la base de datos al usuario correspondiente a un email
     * @param {number} id - Id del usuario a actualizar
     * @param {UpdateUserDto} updateUserDto - Data transfer object con los datos a actualizar
     * @returns - Usuario actualizado
     */
    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }
  
    /**
     * Elimina de la base de datos al usuario correspondiente a un email
     * @param {id} id - Id del usuario a eliminar 
     * @returns - Usuario eliminado
     */
    async remove(id: number): Promise<UserEntity> {
        return await this.userRepository.remove(id);
    }

    /**
     * Determina la cantidad de usuarios por rol
     * @param {Role} role - Rol de usuario
     * @returns - Cantidad de usuarios por rol
     */
    async countUsersByRole(role: UserRole) {
        return await this.userRepository.countUsersByRole(role);
    }

}
