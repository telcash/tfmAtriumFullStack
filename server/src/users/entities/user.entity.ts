import { Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";


/**
 * Entidad usuario para enviar como respuesta al cliente
 * Implementa User de Prisma
 */
export class UserEntity implements User {
    /**
     * Genera una entidad de la clase con cualquier parcial de ella
     * @param partial - 
     */
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    id: number;
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;

    @Exclude()
    refreshToken: string;

    @Exclude()
    password: string;

    createdAt: Date;
    updatedAt: Date;
}