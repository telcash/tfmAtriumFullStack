import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { HashService } from '../common/services/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDto } from './dto/update-password.dto';

/**
 * Definicion de type JwtTokens
 */
export type JwtTokens = {
    accessToken: string,
    refreshToken: string,
}

/**
 * Servicio que implementa las funciones de autorización y autenticación
 */
@Injectable()
export class AuthService {
    constructor(
        private hashService: HashService,
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    /**
     * Crea un usuario tipo CLIENT
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns {User} - Usuario creado
     */
    async signup(createUserDto: CreateUserDto): Promise<User> {
        // Se realiza el hash del password recibido en el dto antes de crear el usuario en la base de datos
        const hashedPassword: string = await this.hashService.hashData(createUserDto.password);

        // Actualizamos los datos para la creación del usuario
        // Invocamos al servicio que crea el usuario
        return this.usersService.create({
            ...createUserDto,
            role: Role.CLIENT,
            password: hashedPassword,
            refreshToken: null,
        });
    }

    /**
     * Valida las credenciales de inicio de sesión de un usuario
     * @param {string} email - Credencial email del usuario que intenta iniciar sesión
     * @param {string} password - Credencial password del usuario que intenta iniciar sesión
     * @returns {User} - Usuario validado
     */
    async validateUser(email: string, password: string): Promise<User> {

        // Buscamos en la base de datos el usuario registrado con el email
        // Si no existe, el repositorio lanza un error
        const user: User = await this.usersService.findUserByEmail(email);

        // Si existe el usuario comparamos el password recibido con el password de la base de datos
        // Lanzamos un error si el password no es válido
        if (! await this.hashService.isMatch(password, user.password)) {
            throw new UnauthorizedException('Password invalid')
        }

        // Retorna el usuario si las credenciales son válidas
        return user;
    }

    /**
     * Realiza el login de un usuario validado
     * @param {User} user - Usuario validado
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    async login(user: User): Promise<JwtTokens> {
        // Genera los tokens para el usuario autenticado
        const tokens: JwtTokens = await this.getTokens(user);

        // Actualiza en la base de datos el refreshToken del usuario autenticado
        await this.updateRefreshToken(user.email, tokens.refreshToken);
        
        return tokens;
    }

    /**
     * Realiza la actualización del password de un usuario
     * @param {string} email - Email del usuario que actualiza el password
     * @param {string} updatePasswordDto - DTO para la actualización del password
     * @returns {User} - Usuario con nuevo password
     */
    async updatePassword(email:string, updatePasswordDto: UpdatePasswordDto): Promise<User> {
        // Validamos que el nuevo password y su verificación sean iguales
        if (updatePasswordDto.newPassword !== updatePasswordDto.newPasswordConfirmation) {
            throw new UnauthorizedException('Confirm password does not match password')
        }

        // Valida el usuario (verifica que el password viejo es correcto)
        // Lanza un error si no lo es
        await this.validateUser(email, updatePasswordDto.password);

        // Actualiza el password del usuario
        const hashedPassword: string = await this.hashService.hashData(updatePasswordDto.newPassword);
        return await this.usersService.update(email, { password: hashedPassword});
    }

    /**
     * Realiza el cierre de sesion de un usuario autenticado
     * @param {string} email - email del usuario 
     * @returns {User} - Usuario con refreshToken null
     */
    async logout(email: string): Promise<User> {
        // Establece como null el refreshToken del usuario en la base de datos
        return await this.usersService.update(email, { refreshToken: null });
    }

    /**
     * Genera el accessToken y refreshToken para un usuario
     * @param {User} user - Usuario al que se le crearan los tokens
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    async getTokens(user: User): Promise<JwtTokens> {

        // Establece el payload que tendrán los tokens generados
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        }

        // Genera los tokens con el servicio jwtService
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '60m',
                },
            ),
            this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);
        return {
            accessToken,
            refreshToken,
        }
    }

    /**
     * Actualiza el refreshToken de un usuario en la base de datos
     * @param {string} email 
     * @param {string} refreshToken 
     */
    async updateRefreshToken(email: string, refreshToken: string) {
        // Hash del refreshToken para guardar en la base de datos
        const hashedRefreshToken: string = await this.hashService.hashData(refreshToken);
        
        // Se guarda el hash del refreshToken en la base de datos
        await this.usersService.update(email, { refreshToken: hashedRefreshToken});
    }

    /**
     * Genera nuevos tokens para un usuario dado un refreshToken
     * @param {string} email - email del usuario
     * @param {string} refreshToken - refreshToken del usuario
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    async refreshTokens(email: string, refreshToken: string): Promise<JwtTokens> {
        // Busca al usuario en la base de datos
        // Si no lo encuentra, el repositorio lanza un error
        const user: User = await this.usersService.findUserByEmail(email);
        
        // Si el usuario no tiene refreshToken en la base de datos, o este no coincide con el
        // suministrado, negamos el acceso
        if(!user.refreshToken || await this.hashService.isMatch(refreshToken, user.refreshToken)) {
            throw new ForbiddenException('Access Denied');
        }

        // Genera nuevos tokens para el usuario
        const tokens: JwtTokens = await this.getTokens(user);

        // Actualiza el nuevo refreshToken en la base de datos
        await this.updateRefreshToken(email, tokens.refreshToken);
        
        return tokens;
    }
}
