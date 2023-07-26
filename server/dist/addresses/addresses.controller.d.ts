import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(userId: number, createAddressDto: CreateAddressDto): Promise<AddressEntity>;
    findAll(userId: number): Promise<AddressEntity[]>;
    findOne(id: string, userId: number): Promise<AddressEntity>;
    update(id: string, userId: number, updateAddressDto: UpdateAddressDto): Promise<AddressEntity>;
    remove(id: string, userId: number): Promise<AddressEntity>;
}
