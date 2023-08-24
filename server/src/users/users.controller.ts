import { Body, Controller, Get, Patch, UseGuards, Delete, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { LastAdminGuard } from './guards/last-admin.guard';
import { UserRole } from './constants/user-role';
import { User } from './decorators/user.decorator';
import { SignupPipe } from 'src/auth/pipes/signup.pipe';

/**
 * Controlador del modulo {@link UsersModule}
 * Procesa las peticiones al endpoint 'users'
 * Endpoints protegidos por {@link JwtAccessGuard}
 */
@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    /**
     * Endpoint para la solicitud de creación de un usuario (Por parte de un ADMIN)
     * Usa {@link RoleGuard} para solo darle acceso a un Admin
     * @param {CreateUserDto} createUserDto - DTO para crear al usuario, validado con class-validator
     * @returns {UserEntity} - Usuario creado
     */
    @UseGuards(RoleGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body(SignupPipe) createUserDto: CreateUserDto): Promise<UserEntity> {
        return new UserEntity(await this.usersService.create(createUserDto));
    }
    
    /**
     * Endpoint para la solicitud del listado de todos los usuarios registrados
     * Usa {@link RoleGuard} para solo darle acceso a un Admin
     * @returns {UserEntity[]} - Listado de usuarios
     */
    @UseGuards(RoleGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    async findAll(): Promise<UserEntity[]> {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserEntity(user));
    }

    /**
     * Endpoint para la eliminación de un usuario
     * @param {string} id - Parámetro con el id del usuario a eliminar 
     * @returns {UserEntity} - Usuario eliminado
     */
    @UseGuards(LastAdminGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async removeById(@Param('id') id: string): Promise<UserEntity> {
        return new UserEntity(await this.usersService.remove(+id));
    }

    /**
     * Endpoint para solicitud de datos de un usuario con sesión iniciada
     * La solicitud la hace el propio usuario
     * @param id - Id del usuario validado y agregado al request por {@link JwtAccessGuard}
     * @returns {UserEntity} - Usuario
     */
    @Get('profile')
    async findOne(@User('sub') id): Promise<UserEntity> {
        return new UserEntity (await this.usersService.findUserById(id));
    }

    /**
     * Endpoint para solicitud de edición de datos de un usuario con sesión iniciada
     * La solicitud la hace el propio usuario
     * @param {UpdateUserDto} updateUserDto - DTO con los datos a editar. Validado con class-validator
     * @param id - Id del usuario validado y agregado al request por {@link JwtAccessGuard}
     * @returns {UserEntity} - Usuario actualizado
     */
    @Patch('profile')
    async update(@User('sub') id, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return new UserEntity(await this.usersService.update(id, updateUserDto));
    }

    /**
     * Endpoint para solicitud de eliminación de un usuario con sesión iniciada
     * La solicitud la hace el propio usuario
     * Usa {@link LastAdminGuard} para evitar eliminar a un admin si es el único registrado
     * @param id - Id del usuario validado y agregado al request por {@link JwtAccessGuard}
     * @returns {UserEntity} - Usuario eliminado
     */
    @UseGuards(LastAdminGuard)
    @Delete('profile')
    async remove(@User('sub') id): Promise<UserEntity> {
        return new UserEntity(await this.usersService.remove(id));
    }
}
