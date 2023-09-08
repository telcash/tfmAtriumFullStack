import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { HashService } from '../common/services/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { isEmail, isStrongPassword } from 'class-validator';

/**
 * Definicion de tipo JwtTokens
 * Defino un objeto que contiene una pareja de JSON Web Tokens, uno de acceso y otro de refrescamiento
 */
export type JwtTokens = {
    accessToken: string,
    refreshToken: string,
}

/**
 * Servicio que implementa las funciones de autorización y autenticación de usuarios
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
     * Crea un usuario tipo CLIENT respondiendo a una solicitud de registro de usuario
     * Recibe un DTO validado con class-validator y {@link SignupPipe}
     * Invoca al método create() de {@link UsersService}
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns - Usuario creado
     */
    async signup(createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    /**
     * Implementa el inicio de sesión de un usuario generando sus JSON Web Tokens de acceso y refrescamiento
     * El usuario está previamente validado con {@link LocalAuthGuard}
     * Invoca al metodo getTokens() para generar los tokens
     * Invoca al metodo updateRefreshToken para almacenar en la base de datos el token de refrescamiento
     * @param {UserEntity} user - Usuario validado
     * @returns {JwtTokens} - JSON Web Tokens de acceso y de refrescamiento
    */
    async login(user: UserEntity): Promise<JwtTokens> {
       // Genera los tokens para el usuario autenticado
       const tokens: JwtTokens = await this.getTokens(user);
       
       // Actualiza en la base de datos el token de refrescamiento del usuario autenticado
       await this.updateRefreshToken(user.id, tokens.refreshToken);

       return tokens;
    }
    
    /**
     * Valida las credenciales de inicio de sesión de un usuario: email y contraseña
     * Si las credenciales son válidas retorna el usuario validado
     * Este método forma parte de la estrategia de validación implementada por {@link LocalAuthGuard}
     * Verifica que existe en la base de datos un usuario con el mail recibido
     * Verifica que la contraseña recibida coincide con la contraseña en la base de datos
     * @param {string} email - Credencial email del usuario a validar
     * @param {string} password - Credencial password a validar
     * @returns - Usuario validado
     */
    async validateUser(email: string, password: string) {

        if(!isEmail(email) || !isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            throw new UnauthorizedException('Credentials format invalid')
        }

        // Buscamos en la base de datos el usuario registrado con el email
        // Si no existe, el repositorio lanza un error
        const user = await this.usersService.findUserByEmail(email);

        // Si existe el usuario comparamos el password recibido con el password de la base de datos
        // Lanzamos un error si el password no es válido
        if (! await this.hashService.isMatch(password, user.password)) {
            throw new UnauthorizedException('Password invalid')
        }

        // Retorna el usuario si las credenciales son válidas
        return user;
    }

    /**
     * Implementa el cierre de sesion de un usuario autenticado
     * Elimina de la base de datos el token de refrescamiento del usuario
     * Con el token de refrescamiento eliminado el usuario no puede generar más tokens de acceso
     * @param {number} id - Id del usuario 
     * @returns  - Usuario con refreshToken null
     */
     async logout(id: number) {
        // Establece como null el refreshToken del usuario en la base de datos
        return await this.usersService.update(id, { refreshToken: null });
    }

    /**
     * Realiza la actualización de la contraseña de un usuario
     * Invoca el método update() de {@link UsersService} para que gestione la modificación
     * @param {number} id - Id del usuario que actualiza la contraseña
     * @param {string} updatePasswordDto - DTO para la actualización de la contraseña
     * @returns - Usuario actualizado con nueva contraseña
     */
    async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
        return await this.usersService.update(id, updatePasswordDto);
    }

    /**
     * Genera nuevos JSON Web Tokens de acceso y de refrescamiento
     * Busca al usuario en la base de datos y extrae el último token de refrescamiento almacenado
     * Verifica que el token de refrescamiento solicitado coincide con el suministrado
     * Si el token suministrado (aunque válido) no coincide con el almacenado se niega el acceso por seguridad y no se generan nuevos tokens
     * Si los tokens coinciden se realiza la rotación de tokens creando unos nuevos
     * Se actualiza en la base de datos el nuevo token de refrescamiento generado
     * @param {number} id - Id del usuario validado y agregado al request por {@link JwtRefreshGuard}
     * @param {string} refreshToken - Token de refrescamiento validado y agregado al request por {@link JwtRefreshGuard}
     * @returns {JwtTokens} - Nuevos JSON Web Tokens de acceso y de refrescamiento
     */
    async refreshTokens(id: number, refreshToken: string): Promise<JwtTokens> {
        // Busca al usuario en la base de datos
        // Si no lo encuentra, el repositorio lanza un error
        const user = await this.usersService.findUserById(id);
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
     * Genera un JSON Web token de acceso y un JSON Web token de refrescamiento
     * Establece la información del payload de los tokens
     * Usa el servicio jwtService para generar los tokens
     * Firna los tokens con un secreto único
     * Establece los tiempos de expiración de los tokens
     * @param {UserEntity} user - Usuario al que se le crearan los tokens
     * @returns {JwtTokens} - JSON Web Tokens de acceso y de refrescamiento
     */
    async getTokens(user: UserEntity): Promise<JwtTokens> {

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
     * Actualiza el token de refrescamiento de un usuario en la base de datos
     * Realiza el hashing del token antes de almacenarlo
     * Invoca el método update() de {@link UsersService} para gestionar la actualización
     * @param {number} id - Id del usuario 
     * @param {string} refreshToken - Nuevo refreshToken
     */
    async updateRefreshToken(id: number, refreshToken: string) {
        // Hash del token de refrescamiento para guardar en la base de datos
        const hashedRefreshToken: string = await this.hashService.hashData(refreshToken);
        
        // Se guarda el hash del token de refrescamiento en la base de datos
        await this.usersService.update(id, { refreshToken: hashedRefreshToken});
    }

}
