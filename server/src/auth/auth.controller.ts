import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService, JwtTokens } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { SignupPipe } from './pipes/signup.pipe';
import { PasswordUpdatePipe } from './pipes/password-update.pipe';
import { User } from 'src/users/decorators/user.decorator';

/**
 * Controlador del modulo AuthModule
 */
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    /**
     * Endpoint para registro de usuario tipo CLIENT (signup)
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns {UserEntity} - Usuario creado
     */
    @Post('signup')
    async signup(@Body(SignupPipe) createUserDto: CreateUserDto): Promise<UserEntity>{
        return new UserEntity(await this.authService.signup(createUserDto));
    }

    /**
     * Endpoint para inicio de sesion de usuario
     * Protegido por LocalAuthGuard
     * @param user - Usuario
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserEntity): Promise<JwtTokens> {
        return await this.authService.login(user);
    }
    
    /**
     * Endpoint para cierre se sesión
     * Protegido por JwtAccessGuard
     * @param id - Id del usuario
     * @returns {UserEntity} - Usuario que cierra sesión
     */
    @UseGuards(JwtAccessGuard)
    @Get('logout')
    async logout(@User('sub') id): Promise<UserEntity> {
        return new UserEntity (await this.authService.logout(id));
    }

    /**
     * Endpoint para actualización de password de usuario
     * Protegido por JwtAccessGuard
     * @param id - Id del usuario
     * @param {UpdatePasswordDto} updatePasswordDto - Dto para actualización de password.
     * @returns {UserEntity} - Usuario actualizado
     */
    @UseGuards(JwtAccessGuard)
    @Patch('password')
    async updatePassword(@User('sub') id, @Body(PasswordUpdatePipe) updatePasswordDto: UpdatePasswordDto): Promise<UserEntity> {
        return new UserEntity(await this.authService.updatePassword(id, updatePasswordDto));
    }

    /**
     * Endpoint para actualización de tokens
     * Protegido por JwtRefreshGuard
     * @param id - Id del usuario
     * @param refreshToken - Refresh Token del usuario 
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refreshTokens(@User('sub') id, @User('refreshToken') refreshToken): Promise<JwtTokens> {
        return await this.authService.refreshTokens(id, refreshToken);
    }
}
