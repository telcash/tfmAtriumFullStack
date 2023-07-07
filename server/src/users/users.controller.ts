import { Body, Controller, Get, Request, Param, ParseIntPipe, Patch, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getUser(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateUser(
        @Body() dto: UpdateUserDto,
        @Request() req
    ) {
        return this.usersService.updateUser(req.user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('profile')
    deleteUser(
        @Request() req
    ) {
        return this.usersService.deleteUser(req.user.id);
    }
}
