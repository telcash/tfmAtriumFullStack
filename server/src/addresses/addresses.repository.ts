import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDto } from './dto/create-address.dto';



@Injectable()
export class AddressesRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(createAddressDto: CreateAddressDto) {
        return await this.prisma.address.create({
            data: createAddressDto,
        })
    }



}