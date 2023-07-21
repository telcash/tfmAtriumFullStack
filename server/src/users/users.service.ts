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
     * Crea un nuevo usuario.
     * Invoca el método create() de {@link UsersRepository} para crear un usuario en la base de datos
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns  - Usuario creado
     */
    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.create(createUserDto);
    }

    /**
     * Genera un listado de todos los usuarios registrados
     * Invoca el método findAll() de {@link UsersRepository} para buscar en la base de datos a todos los usuarios registrados
     * @returns  - Listado de usuarios en la base de datos
     */
    async findAll() {
        return await this.userRepository.findAll();
    }

    /**
     * Gestiona la busqueda de un usuario según su email
     * Invoca el método findUserByEmail() de {@link UsersRepository} para buscar el usuario en la base de datos
     * @param {string} email - email del usuario a buscar
     * @returns - Usuario correspondiente
     */
    async findUserByEmail(email: string) {
        return await this.userRepository.findUserByEmail(email);
    }
    
    /**
     * Gestiona la busqueda de un usuario según su id
     * Invoca el método findUserById() de {@link UsersRepository} para buscar el usuario en la base de datos
     * @param {number} id - Id del usuario
     * @returns  - Usuario buscado
     */
    async findUserById(id: number) {
        return await this.userRepository.findUserById(id);
    }

    /**
     * Gestiona la actualización de los datos de un usuario identificado con su id
     * Invoca el método update() de {@link UsersRepository} para actualizar los datos en la base de datos
     * @param {number} id - Id del usuario a actualizar
     * @param {UpdateUserDto} updateUserDto - DTO con los datos a actualizar
     * @returns - Usuario actualizado
     */
    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }
  
    /**
     * Gestiona la eliminación de un usuario identificado con su id
     * Invoca el método remove() de {@link UsersRepository} para eliminar el usuario de la base de datos
     * @param {id} id - Id del usuario a eliminar 
     * @returns - Usuario eliminado
     */
    async remove(id: number): Promise<UserEntity> {
        return await this.userRepository.remove(id);
    }

    /**
     * Determina la cantidad de usuarios registrados según su rol
     * Invoca el método countUsersByRole() de {@link UsersRepository} para realizar el conteo en la base de datos
     * @param {Role} role - Rol de usuario
     * @returns - Cantidad de usuarios por rol
     */
    async countUsersByRole(role: UserRole) {
        return await this.userRepository.countUsersByRole(role);
    }

}
