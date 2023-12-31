/**
 * Interface que modelo a un usuario
 */
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
    role?: string;
}
