import { Injectable, Request } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


/**
 * Estrategia que ejecuta el Guard JwtRefreshGuard
 * Usa la libreria passport-jwt
 * Hereda de PassportStrategy
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    /**
     * Constructor que invoca al Constructor de PassportStrategy
     * Verifica que existe un token válido en el request
     */
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        })
    }

    /**
     * Implementacion de la funcion validate de la estrategia
     * @param req - Request 
     * @param payload - Payload del token validado
     * @returns - Payload del token validado y el refreshToken
     */
    async validate(@Request() req, payload: any) {
        // Extrae el token del request
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        
        return { ...payload, refreshToken};
    }
}