import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { HashService } from '../common/services/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
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
        private readonly hashService: HashService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * Crea un usuario tipo CLIENT
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns {User} - Usuario creado
     */
    async signup(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto);
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
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        
        return tokens;
    }

    /**
     * Realiza el cierre de sesion de un usuario autenticado
     * @param {number} id - Id del usuario 
     * @returns {User} - Usuario con refreshToken null
     */
     async logout(id: number): Promise<User> {
        // Establece como null el refreshToken del usuario en la base de datos
        return await this.usersService.update(id, { refreshToken: null });
    }

    /**
     * Realiza la actualización del password de un usuario
     * @param {number} id - Id del usuario que actualiza el password
     * @param {string} updatePasswordDto - DTO para la actualización del password
     * @returns {User} - Usuario con nuevo password
     */
    async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<User> {
        return await this.usersService.update(id, updatePasswordDto);
    }

    /**
     * Genera nuevos tokens para un usuario dado un refreshToken
     * @param {number} Id - Id del usuario
     * @param {string} refreshToken - refreshToken del usuario
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    async refreshTokens(id: number, refreshToken: string): Promise<JwtTokens> {
        // Busca al usuario en la base de datos
        // Si no lo encuentra, el repositorio lanza un error
        const user: User = await this.usersService.findUserById(id);
        // Si el usuario no tiene refreshToken en la base de datos, o este no coincide con el
        // suministrado, negamos el acceso
        if(!user.refreshToken || ! await this.hashService.isMatch(refreshToken, user.refreshToken)) {
            throw new ForbiddenException('Access Denied');
        }

        // Genera nuevos tokens para el usuario
        const tokens: JwtTokens = await this.getTokens(user);

        // Actualiza el nuevo refreshToken en la base de datos
        await this.updateRefreshToken(id, tokens.refreshToken);
        
        return tokens;
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
     * @param {number} id - Id del usuario 
     * @param {string} refreshToken - Nuevo refreshToken
     */
    async updateRefreshToken(id: number, refreshToken: string) {
        // Hash del refreshToken para guardar en la base de datos
        const hashedRefreshToken: string = await this.hashService.hashData(refreshToken);
        
        // Se guarda el hash del refreshToken en la base de datos
        await this.usersService.update(id, { refreshToken: hashedRefreshToken});
    }

}
