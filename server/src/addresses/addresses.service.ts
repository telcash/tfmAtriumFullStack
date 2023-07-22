import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressesRepository } from './addresses.repository';

@Injectable()
export class AddressesService {
  
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async create(userId: number, createAddressDto: CreateAddressDto) {
    createAddressDto = {...createAddressDto, userId: userId}
    return await this.addressesRepository.create(createAddressDto)
  }

  async findAll() {
    return await this.addressesRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}