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
    return await this.addressesRepository.create({...createAddressDto, userId: userId})
  }

  /**
   * Gestiona la busqueda de todas las direcciones de un usuario
   * Invoca el metodo findAll() de {@link AddressesRepository} para buscar todas las direcciones del usuario en la base de datos
   * @returns - Listado de direcciones 
   */
  async findAll(userId: number) {
    return await this.addressesRepository.findAll(userId);
  }

  /**
   * Gestiona la busqueda de una direccion dada su id y la id del usuario a la que pertenece
   * Invoca el metodo findOne() de {@link AddressesRepository} para buscar la dirección en la base de datos
   * @returns - Dirección buscada 
   */
  async findOne(id: number, userId: number) {
    return await this.addressesRepository.findOne(id, userId);
  }

  /**
   * Gestiona la actualización de una direccion dada su id y la id del usuario a la que pertenece
   * Invoca el metodo update() de {@link AddressesRepository} para actualizar la dirección en la base de datos
   * @returns - Dirección actualizada 
   */
  async update(id: number, userId: number, updateAddressDto: UpdateAddressDto) {
    return await this.addressesRepository.update(id, userId, updateAddressDto);
  }

  /**
   * Gestiona la eliminación de una dirección dada su id y la id del usuario a la que pertenece
   * Invoca el metodo remove() de {@link AddressesRepository} para eliminar la dirección en la base de datos
   * @param {number} id - Id de la dirección
   * @param {number} userId - Id del usuario
   * @returns - Dirección eliminada
   */
  async remove(id: number, userId: number) {
    return await this.addressesRepository.remove(id, userId);
  }
}
