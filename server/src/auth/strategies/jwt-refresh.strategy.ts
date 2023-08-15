import { Injectable, Request } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


/**
 * Estrategia que ejecuta el Guard {@link JwtRefreshGuard}
 * Hace uso de  la libreria passport-jwt
 * Hereda de PassportStrategy
 * Valida el Json Web Token de refrescamiento recibido como un Bearer token en el request
 * Si la validación es exitosa retorna el payload del token con la información de usuario establecida en el método getTokens() de {@link AuthService}
 * Agrega el propio token de refrescamiento al payload antes de devolverlo
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    /**
     * Constructor que invoca al Constructor de PassportStrategy
     * Extrae el Json Web Token de acceso recibido como un Bearer token en el request
     * Válida el token: verifica que está firmado con el secret establecido y que no está expirado
     * Si el token es válido ejecuta el método validate()
     * Pasa el request de la petición al método validate()
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
     * Implementacion del método validate de la estrategia
     * Si el método se ejecuta es porque el constructor de la clase validó satisfactoriamente el token
     * Extrae el token del request y lo agrega a su mismo payload
     * @param req - Request 
     * @param payload - Payload del token validado
     * @returns - Payload del token validado con el propio token agregado
     */
    async validate(@Request() req, payload: any) {
        // Extrae el token del request
        const refreshToken: string = req.get('Authorization').replace('Bearer', '').trim();
        
        // Retorna el payload con el token
        return { ...payload, refreshToken};
    }
}