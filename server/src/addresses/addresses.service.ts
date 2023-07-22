import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressesRepository } from './addresses.repository';

@Injectable()
export class AddressesService {
  
  constructor(private readonly addressesRepository: AddressesRepository) {}

  /**
   * Gestiona la creación de una nueva dirección
   * Agrega la propiedad userId con el id del usuario al dto
   * Invoca el metodo create() de {@link AddressesRepository} para crear la dirección en la base de datos
   * @param {number} userId - Id del usuario 
   * @param createAddressDto - Dto para creación de la dirección
   * @returns - Dirección creada
   */
  async create(userId: number, createAddressDto: CreateAddressDto) {
    createAddressDto = {...createAddressDto, userId: userId}
    return await this.addressesRepository.create(createAddressDto)
  }

  /**
   * Gestiona la busqueda de todas las direcciones
   * Invoca el metodo findAll() de {@link AddressesRepository} para buscar todas las direcciones en la base de datos
   * @returns - Listado de direcciones 
   */
  async findAll() {
    return await this.addressesRepository.findAll();
  }

  async findOne(id: number, userId: number) {
    return await this.addressesRepository.findOne(id, userId);
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
