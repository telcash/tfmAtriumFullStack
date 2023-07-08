import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async getAllUsers(): Promise<any[]> {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                role: true,
                firstName: true,
                lastName: true,
                email: true,
                mobile: true,
                createdAt: true,
                updatedAt: true,
            }
        });
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

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await this.prisma.user.update({
            data: dto,
            where: {
                id: id,
            },
        });
        return user;
    }
  
    async deleteUser(id: number) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id: id,
            },
        })
        if(!deletedUser) {
            throw new BadRequestException("User not found");
        }
        return {
            message: 'User deleted'
        };
    }
}
