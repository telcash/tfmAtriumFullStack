import { CreateUserDto } from '../users/dto/create-user.dto';
import { HashService } from '../common/services/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from 'src/users/entities/user.entity';
export type JwtTokens = {
    accessToken: string;
    refreshToken: string;
};
export declare class AuthService {
    private readonly hashService;
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(hashService: HashService, usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    signup(createUserDto: CreateUserDto): Promise<{
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: UserEntity): Promise<JwtTokens>;
    validateUser(email: string, password: string): Promise<{
        cart: {
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            addressId: number;
        };
        addresses: {
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        orders: {
            id: number;
            userId: number;
            total: number;
            paymentIntent: string;
            status: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    logout(id: number): Promise<{
        cart: {
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            addressId: number;
        };
        addresses: {
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        orders: {
            id: number;
            userId: number;
            total: number;
            paymentIntent: string;
            status: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<{
        cart: {
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            addressId: number;
        };
        addresses: {
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        orders: {
            id: number;
            userId: number;
            total: number;
            paymentIntent: string;
            status: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshTokens(id: number, refreshToken: string): Promise<JwtTokens>;
    getTokens(user: UserEntity): Promise<JwtTokens>;
    updateRefreshToken(id: number, refreshToken: string): Promise<void>;
}
