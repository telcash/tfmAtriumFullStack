import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
        //const { password, ...result} = user
        return user;
    }
}
