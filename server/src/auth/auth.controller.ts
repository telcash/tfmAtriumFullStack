import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    createUser(@Body() data: CreateUserDto){
        return this.authService.createUser(data);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}
