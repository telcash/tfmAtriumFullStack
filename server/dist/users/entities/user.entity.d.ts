import { User } from "@prisma/client";
export declare class UserEntity implements User {
    constructor(partial: Partial<UserEntity>);
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    refreshToken: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
