import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async findAll(): Promise<any[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async findUserByEmail(email: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if(!user) {
            throw new BadRequestException("User not found");
        }
        return user;
    }

    async update(email: string, dto: UpdateUserDto) {
        const updatedUser = await this.prisma.user.update({
            data: dto,
            where: {
                email: email,
            },
        });
        return updatedUser;
    }
  
    async remove(email: string) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                email: email,
            },
        })
        if(!deletedUser) {
            throw new BadRequestException("User not found");
        }
        return deletedUser;
    }
}
