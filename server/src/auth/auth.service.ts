import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { HashService } from './services/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

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
     * Crea un usuario en la base de datos
     * @param {CreateUserDto} createUserDto - Data transfer object del usuario a crear
     * @returns {User} - Usuario en la base de datos
     */
    async signup(createUserDto: CreateUserDto): Promise<User> {
        // Se realiza el hash del password recibido en el dto antes de crear el usuario en la base de datos
        const hashedPassword = await this.hashService.hashData(createUserDto.password);

        // Actualizamos los datos para la creación del usuario
        createUserDto = {
            ...createUserDto,
            password: hashedPassword,
        }

        // Invocamos al servicio que crea el usuario
        return this.usersService.create(createUserDto);
    }

    /**
     * Valida las credenciales de inicio de sesión de un usuario
     * @param {string} email - Credencial email del usuario que intenta iniciar sesión
     * @param {string} password - Credencial password del usuario que intenta iniciar sesión
     * @returns {User | null} - Usuario si las credenciales son válidas, sino null
     */
    async validateUser(email: string, password: string): Promise<User | null> {

        // Buscamos en la base de datos el usuario registrado con el email
        const user = await this.usersService.findUserByEmail(email);

        // Si existe el usuario comparamos el password recibido con el password de la base de datos
        if (user && await this.hashService.isMatch(password, user.password)) {
            return user;
        }

        // Retorna null si las credenciales no son válidas
        return null;
    }

    /**
     * Realiza el login de un usuario autenticado
     * @param user - Usuario autenticado
     * @returns - accessToken y refreshToken del usuario
     */
    async login(user: any) {
        // Genera los tokens para el usuario autenticado
        const tokens = await this.getTokens(user);

        // Actualiza en la base de datos el refreshToken del usuario autenticado
        await this.updateRefreshToken(user.email, tokens.refreshToken);
        
        return tokens;
    }

    /**
     * Realiza el logout de un usuario autenticado
     * @param {string} email - email del usuario 
     * @returns - Usuario con refreshToken null
     */
    async logout(email: string) {
        // Establece como null el refreshToken del usuario en la base de datos
        return this.usersService.update(email, { refreshToken: null });
    }

    /**
     * Genera el accessToken y refreshToken para un usuario
     * @param user - Usuario al que se le crearan los tokens
     * @returns - Tokens para el usuario
     */
    async getTokens(user: any) {

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
        const hashedRefreshToken = await this.hashService.hashData(refreshToken);
        
        // Se guarda el hash del refreshToken en la base de datos
        await this.usersService.update(email, { refreshToken: hashedRefreshToken});
    }

    /**
     * Genera nuevos tokens para un usuario dado un refreshToken
     * @param {string} email - email del usuario
     * @param {string} refreshToken - refreshToken del usuario
     * @returns - Tokens nuevos para el usuario
     */
    async refreshTokens(email: string, refreshToken: string) {
        // Busca al usuario en la base de datos
        const user = await this.usersService.findUserByEmail(email);
        
        // Si no encuentra al usuario o el usuario no tiene refreshToken negamos el acceso
        if(!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied');
        }

        // Comprueba que el refreshToken recibido coincide con el refreshToken en la base de datos
        const refreshTokenMatches = await this.hashService.isMatch(refreshToken, user.refreshToken);
        if (!refreshTokenMatches) {
            throw new ForbiddenException('Access Denied');
        }

        // Genera nuevos tokens para el usuario
        const tokens = await this.getTokens(user);

        // Actualiza el nuevo refreshToken en la base de datos
        await this.updateRefreshToken(email, tokens.refreshToken);
        
        return tokens;
    }
}
