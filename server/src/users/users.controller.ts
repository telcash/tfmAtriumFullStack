import { Body, Controller, Get, Request, Patch, UseGuards, Delete, Post, UseFilters, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

/**
 * Controlador del modulo UsersModule
 * Endpoints protegidos por JwtAccessGuard
 */
@UseGuards(JwtAccessGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    /**
     * Endpoint para la creación de un usuario
     * Endpoint protegido por RoleGuard
     * @param {CreateUserDto} createUserDto - DTO para crear al usuario 
     * @returns {UserEntity} - Usuario creado
     */
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    @Post()
    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return new UserEntity(await this.usersService.create(createUserDto));
    }
    
    /**
     * Endpoint para obtener un listado de todos los usuarios
     * Endpoint protegido por RoleGuard
     * @returns {UserEntity[]} - Listado de usuarios
     */
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    @Get()
    async findAll(): Promise<UserEntity[]> {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserEntity(user));
    }


    /**
     * Endpoint para obtener los datos del usuario que hace la petición
     * @param req
     * @returns {UserEntity} - Datos del usuario que hace la petición
     */
    @Get('profile')
    async findOne(@Request() req): Promise<UserEntity> {
        return new UserEntity(await this.usersService.findUserByEmail(req.user.email));
    }

    /**
     * Endpoint para editar los datos del usuario que hace la petición
     * @param {UpdateUserDto} updateUserDto - DTO con los datos a editar
     * @param req -Request
     * @returns {UserEntity} - Usuario actualizado
     */
    @Patch('profile')
    async update(@Body() updateUserDto: UpdateUserDto, @Request() req): Promise<UserEntity> {
        return new UserEntity(await this.usersService.update(req.user.email, updateUserDto));
    }

    /**
     * Endpoint para eliminar al usuario que hace la petición
     * @param req - Request
     * @returns {UserEntity} - Usuario eliminado
     */
    @Delete('profile')
    async remove(@Request() req): Promise<UserEntity> {
        return new UserEntity(await this.usersService.remove(req.user.email));
    }
}
