import { UserRole } from "../constants/user-role";
export declare class CreateUserDto {
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
    refreshToken: string;
}
