import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from './password.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService,
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async createUser(dto: CreateUserDto): Promise<any> {
        const hashedPassword = await this.passwordService.hashPassword(dto.password);
        const user = await this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
            }
        })
        return user;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        if (user && await this.passwordService.isMatch(password, user.password)) {
            const { password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
