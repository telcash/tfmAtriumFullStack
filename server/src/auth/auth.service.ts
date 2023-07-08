import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from './services/password.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService,
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async signup(dto: CreateUserDto): Promise<any> {
        const hashedPassword = await this.passwordService.hashPassword(dto.password);
        const user = await this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
            }
        })
        return user;
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findUserByEmail(email);
        if (user && await this.passwordService.isMatch(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
