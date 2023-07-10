import { Body, Controller, Get, Request, Patch, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from './entities/user.entity';

/**
 * Controlador del modulo UsersModule
 * Endpoints protegidos por JwtAccessGuard
 */
@Controller('users')
@UseGuards(JwtAccessGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

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
     * @returns - Datos del usuario que hace la petición
     */
    @Get('profile')
    async findOne(@Request() req): Promise<UserEntity> {
        return new UserEntity(await this.usersService.findUserByEmail(req.user.email));
    }

    /**
     * Endpoint para editar los datos del usuario que hace la petición
     * @param {UpdateUserDto} dto - Data transfer object con los datos a editar
     * @param req 
     * @returns - Datos actualizados del usuario que hace la petición
     */
    @Patch('profile')
    async update(
        @Body() dto: UpdateUserDto,
        @Request() req
    ): Promise<UserEntity> {
        return new UserEntity(await this.usersService.update(req.user.email, dto));
    }

    /**
     * Endpoint para eliminar al usuario que hace la petición
     * @param req 
     * @returns - Datos del usuario eliminado
     */
    @Delete('profile')
    async remove(@Request() req): Promise<UserEntity> {
        return new UserEntity(await this.usersService.remove(req.user.id));
    }
}
