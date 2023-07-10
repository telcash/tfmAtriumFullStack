import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

/**
 * Estrategia que ejecuta el Guard LocalGuard
 * Usa la libreria passport-local
 * Hereda de PassportStrategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    /**
     * Constructor que invoca al Constructor de PassportStrategy
     * Establece el email como username
     */
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        })
    }

    /**
     * Implementacion de la funcion validate de la estrategia
     * @param {string} email - email del usuario a validar
     * @param {string} password - password del usuario a validar
     * @returns - Usuario validado
     */
    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}