import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserEntity } from "src/users/entities/user.entity";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<UserEntity>;
}
export {};
