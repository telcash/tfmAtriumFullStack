import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly passwordService: PasswordService){}

    async createUser(dto: CreateUserDto): Promise<any> {
        console.log(dto);
        const hashedPassword = await this.passwordService.hashPassword(dto.password);
        console.log(hashedPassword);
        const user = await this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
            }
        })
        return user;
    }
}
