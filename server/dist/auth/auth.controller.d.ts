import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService, JwtTokens } from './auth.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<UserEntity>;
    login(user: any): Promise<JwtTokens>;
    logout(id: any): Promise<UserEntity>;
    updatePassword(id: any, updatePasswordDto: UpdatePasswordDto): Promise<UserEntity>;
    refreshTokens(id: any, refreshToken: any): Promise<JwtTokens>;
}
