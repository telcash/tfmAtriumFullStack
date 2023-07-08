import { Body, Controller, Get, Request, Param, ParseIntPipe, Patch, UseGuards, Delete, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserEntity } from './models/user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    async findAll() {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserEntity(user));
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async findOne(@Request() req) {
        return new UserEntity(await this.usersService.findUserByEmail(req.user.email));
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    async update(
        @Body() dto: UpdateUserDto,
        @Request() req
    ) {
        return new UserEntity(await this.usersService.update(req.user.email, dto));
    }

    @UseGuards(JwtAuthGuard)
    @Delete('profile')
    async remove(
        @Request() req
    ) {
        return new UserEntity(await this.usersService.remove(req.user.id));
    }
}
