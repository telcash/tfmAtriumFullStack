import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '../users/models/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    async signup(@Body() dto: CreateUserDto){
        return new UserEntity(await this.authService.signup(dto));
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    logout(@Request() req) {
        this.authService.logout(req.user.email);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refreshTokens(@Request() req) {
        return this.authService.refreshTokens(req.user.email, req.user.refreshToken);
    }
}
