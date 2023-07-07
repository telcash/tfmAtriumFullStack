import { Body, Controller, Get, Request, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
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
        this.usersService.updateUser(req.user.id, dto);
    }
}
