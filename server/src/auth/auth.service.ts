import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashService } from './services/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private hashService: HashService,
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    async signup(dto: CreateUserDto): Promise<any> {
        const hashedPassword = await this.hashService.hashData(dto.password);
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
        if (user && await this.hashService.isMatch(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const tokens = await this.getTokens(user);
        await this.updateRefreshToken(user.email, tokens.refreshToken);
        return tokens;
    }

    async logout(email: string) {
        return this.usersService.update(email, { refreshToken: null });
    }

    async getTokens(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        }
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);
        return {
            accessToken,
            refreshToken,
        }
    }

    async updateRefreshToken(email: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashService.hashData(refreshToken);
        await this.usersService.update(email, { refreshToken: hashedRefreshToken});
    }

    async refreshTokens(email: string, refreshToken: string) {
        const user = await this.usersService.findUserByEmail(email);
        if(!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied');
        }
        const refreshTokenMatches = await this.hashService.isMatch(refreshToken, user.refreshToken);
        if (!refreshTokenMatches) {
            throw new ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user);
        await this.updateRefreshToken(email, tokens.refreshToken);
        return tokens;
    }
}
