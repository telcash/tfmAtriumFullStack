import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({
            data: createUserDto
        });
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                cart: true,
            }
        });
    }

    async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({
            data: updateUserDto,
            where: {
                email: email,
            },
        });
    }

    async remove(email: string): Promise<User> {
        return await this.prisma.user.delete({
            where: {
                email: email,
            },
        })
    }
}