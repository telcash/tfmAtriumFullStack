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
     * @returns {UserEntity} - Usuario creado
     */
    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return new UserEntity (await this.userRepository.create(createUserDto));
    }

    /**
     * Encuentra todos los usuarios en la base de datos
     * @returns {UserEntity[]} - Listado de usuarios en la base de datos
     */
    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll();
        return users.map((user) => new UserEntity(user));
    }

    /**
     * Busca  en la base de datos al usuario correspondiente a un email
     * @param {string} email - email del usuario a buscar
     * @returns {UserEntity} - Usuario correspondiente
     */
    async findUserByEmail(email: string): Promise<UserEntity> {
        return new UserEntity(await this.userRepository.findUserByEmail(email));
    }
    
    /**
     * Busca en la base de datos el usuario correspondiente a un id
     * @param {number} id - Id del usuario
     * @returns {UserEntity} - Usuario buscado
     */
    async findUserById(id: number): Promise<UserEntity> {
        return new UserEntity(await this.userRepository.findUserById(id));
    }

    /**
     * Actualiza en la base de datos al usuario correspondiente a un email
     * @param {number} id - Id del usuario a actualizar
     * @param {UpdateUserDto} updateUserDto - Data transfer object con los datos a actualizar
     * @returns {UserEntity} - Usuario actualizado
     */
    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return new UserEntity(await this.userRepository.update(id, updateUserDto));
    }
  
    /**
     * Elimina de la base de datos al usuario correspondiente a un email
     * @param {id} Id - Id del usuario a eliminar 
     * @returns {UserEntity} - Usuario eliminado
     */
    async remove(id: number): Promise<UserEntity> {
        return new UserEntity(await this.userRepository.remove(id));
    }

    /**
     * Determina la cantidad de usuarios por rol
     * @param {Role} role - Rol de usuario
     * @returns {number} - Cantidad
     */
    async countUsersByRole(role: UserRole): Promise<number> {
        return await this.userRepository.countUsersByRole(role);
    }

}
