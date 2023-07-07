import { Role } from "@prisma/client";

export class UpdateUserDto {
    role?: Role;
    firstName?: string;
    lastName?: string;
    mobile?: string;
}