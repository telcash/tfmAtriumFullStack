/**
 * Interface que modela un objeto que contiene los tokens de autenticación
 */
export interface JwtTokens {
    accessToken: string;
    refreshToken: string;
}
