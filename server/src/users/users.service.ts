import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async findUserByEmail(email: string): Promise<any> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            }
        }).catch(() => {
            throw new BadRequestException("Usuario no existe");
        })
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
            data: dto,
            where: {
                id: id,
            },
        });
    }
}
