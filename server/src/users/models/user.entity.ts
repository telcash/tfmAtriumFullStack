import { Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";



export class UserEntity implements User {
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