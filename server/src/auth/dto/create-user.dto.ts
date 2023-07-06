import { Role } from "@prisma/client";


export class CreateUserDto {
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    mobile: string;
}