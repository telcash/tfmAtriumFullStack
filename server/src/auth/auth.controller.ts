import { Body, Controller, Get, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { SetLoginCookiesInterceptor } from './interceptors/set-login-cookies.interceptor';

/**
 * Controlador del Módulo {@link AuthModule}
 * Procesa las peticiones al endpoint 'auth'
 */
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    /**
     * Endpoint para peticiones de registro de usuarios tipo CLIENT (signup)
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario, es validado con {@link SignupPipe} 
     * @returns {UserEntity} - Usuario creado
     */
    @Post('signup')
    async signup(@Body(SignupPipe) createUserDto: CreateUserDto): Promise<UserEntity>{
        return new UserEntity(await this.authService.signup(createUserDto));
    }

    /**
     * Endpoint para peticiones de inicio de sesion de usuario
     * @param user - Usuario validado y agregado al request por {@link LocalAuthGuard}
     * @returns {JwtTokens} - JSON Web Tokens de acceso y de refrescamiento
     */
    @UseInterceptors(SetLoginCookiesInterceptor)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserEntity): Promise<JwtTokens> {
        return await this.authService.login(user);
    }
    
    /**
     * Endpoint para peticiones de cierre de sesión
     * @param id - Id del usuario validado y agregado al request por {@link JwtAccessGuard}
     * @returns {UserEntity} - Usuario que cierra sesión
     */
    @UseGuards(JwtAccessGuard)
    @Get('logout')
    async logout(@User('sub') id): Promise<UserEntity> {
        return new UserEntity (await this.authService.logout(id));
    }

    /**
     * Endpoint para peticiones de actualización de contraseña de un usuario
     * @param id - Id del usuario validado y agregado al request por {@link JwtAccessGuard}
     * @param {UpdatePasswordDto} updatePasswordDto - Dto para actualización de contraseña, es validado con {@link PasswordUpdatePipe}
     * @returns {UserEntity} - Usuario actualizado con nueva contraseña
     */
    @UseGuards(JwtAccessGuard)
    @Patch('password')
    async updatePassword(@User('sub') id, @Body(PasswordUpdatePipe) updatePasswordDto: UpdatePasswordDto): Promise<UserEntity> {
        return new UserEntity(await this.authService.updatePassword(id, updatePasswordDto));
    }

    /**
     * Endpoint para peticiones de nuevo token de acceso por expiración del anterior
     * @param id - Id del usuario validado y agregado al request por {@link JwtRefreshGuard}
     * @param refreshToken - Token de refrescamiento validado y agregado al request por {@link JwtRefreshGuard}
     * @returns {JwtTokens} - Nuevos JSON Web Tokens de acceso y de refrescamiento
     */
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refreshTokens(@User('sub') id, @User('refreshToken') refreshToken): Promise<JwtTokens> {
        return await this.authService.refreshTokens(id, refreshToken);
    }
}
