import { Exclude } from "class-transformer";
import { User } from "@prisma/client";


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
    role: string;
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