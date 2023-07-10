import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

/**
 * Estrategia que ejecuta el Guard JwtAccessGuard
 * Usa la libreria passport-jwt
 * Hereda de PassportStrategy
 */
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
    /**
     * Constructor que invoca al Constructor de PassportStrategy
     * Verifica que existe un token válido en el request
     */
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        })
    }

    /**
     * Implementacion de la funcion validate de la estrategia
     * @param payload - Payload del token validado
     * @returns - Payload del token validado
     */
    async validate(payload: any) {
        return payload;
    }
}