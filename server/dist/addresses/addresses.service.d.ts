import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressesRepository } from './addresses.repository';
export declare class AddressesService {
    private readonly addressesRepository;
    constructor(addressesRepository: AddressesRepository);
    create(userId: number, createAddressDto: CreateAddressDto): Promise<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number, userId: number): Promise<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, userId: number, updateAddressDto: UpdateAddressDto): Promise<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        userId: number;
        street: string;
        postalCode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
