import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from "./dto/update-address.dto";
export declare class AddressesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createAddressDto: CreateAddressDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAll(userId: number): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number, userId?: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: number, userId: number, updateAddressDto: UpdateAddressDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: number, userId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
