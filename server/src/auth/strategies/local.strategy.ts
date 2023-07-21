import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserEntity } from "src/users/entities/user.entity";

/**
 * Estrategia que ejecuta el Guard {@link LocalGuard}
 * Hace uso de la libreria passport-local
 * Hereda de PassportStrategy
 * Válida las credenciales de inicio de sesión recibidas del usuario
 * Las credenciales tienen validaciones previas de class-validator
 * Si las credenciales son válidas devuelve el usuario creado tipo {@link UserEntity}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    /**
     * Constructor que invoca al Constructor de PassportStrategy
     * Establece como username (nombre de usuario único) el email recibido
     * Invoca al método validate para el proceso de validación de las credenciales
     */
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        })
    }

    /**
     * Implementacion de la funcion validate de la estrategia
     * Invoca al método validateUser() de {@link AuthService} para que haga el proceso de validación
     * @param {string} email - email del usuario a validar
     * @param {string} password - password del usuario a validar
     * @returns - Usuario validado
     */
    async validate(email: string, password: string): Promise<UserEntity> {
        return await this.authService.validateUser(email, password);
    }
}