import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

/**
 * Estrategia que ejecuta el Guard {@link JwtAccessGuard}
 * Hace uso libreria passport-jwt 
 * Hereda de PassportStrategy
 * Valida el Json Web Token de acceso recibido como un Bearer token en el request
 * Si la validación es exitosa retorna el payload del token con la información de usuario establecida en el método getTokens() de {@link AuthService}
 */
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
    /**
     * Constructor que invoca al Constructor de PassportStrategy
     * Extrae el Json Web Token de acceso recibido como un Bearer token en el request
     * Valida el token: verifica que está firmado con el secret establecido y que no está expirado
     * Si el token es válido ejecuta el método validate()
     */
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        })
    }

    /**
     * Implementacion del método validate de la estrategia
     * Si el método se ejecuta es porque el constructor de la clase validó satisfactoriamente el token,
     * por lo tanto simplemente devuelve el payload del token 
     * @param payload - Payload del token validado
     * @returns - Payload del token validado
     */
    async validate(payload: any) {
        return payload;
    }
}