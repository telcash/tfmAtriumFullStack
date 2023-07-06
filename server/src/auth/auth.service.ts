import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    async createUser(data: CreateUserDto): Promise<any> {
        const user = await this.prisma.user.create({
            data,
        })
        return user;
    }
}
