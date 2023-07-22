import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { User } from 'src/users/decorators/user.decorator';
import { AddressEntity } from './entities/address.entity';

/**
 * Controlador del modulo {@link AddressesModule}
 */
@UseGuards(JwtAccessGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  /**
   * Endpoint para solicitar un usuario la creación de una dirección
   * @param userId - Id del usuario
   * @param createAddressDto - Dto para crear la nueva dirección
   * @returns - Nueva dirección
   */
  @Post()
  async create(@User('sub') userId: number, @Body() createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    return new AddressEntity(await this.addressesService.create(userId, createAddressDto));
  }

  /**
   * Endpoint para solicitar un usuario todas sus direcciones
   * @returns {AddressEntity[]} - Listado de direcciones
   */
  @Get()
  async findAll(@User('sub') userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addressesService.findAll(userId);
    return addresses.map((address) => new AddressEntity(address));
  }

  /**
   * Endpoint para solicitar un usuario una de sus direcciónes
   * @param {string} id - Id de la dirección 
   * @param {number} userId - Id del usuario
   * @returns {AddressEntity} - Dirección solicitada
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @User('sub') userId: number): Promise<AddressEntity> {
    return new AddressEntity(await this.addressesService.findOne(+id, userId));
  }

  /**
   * Endpoint para solicitar un usuario editar una de sus direcciones
   * @param {string} id - Id de la dirección
   * @param {number} userId - Id del usuario
   * @param {UpdateAddressDto} updateAddressDto 
   * @returns 
   */
  @Patch(':id')
  async update(@Param('id') id: string, @User('sub') userId: number, @Body() updateAddressDto: UpdateAddressDto): Promise<AddressEntity> {
    return new AddressEntity(await this.addressesService.update(+id, userId, updateAddressDto));
  }

  /**
   * Endpoint para solicitar un usuario eliminar una de sus direcciones
   * @param {string} id - Id de la dirección
   * @param {number} userId - Id del usuario
   * @returns {AddressEntity} - Dirección eliminada
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @User('sub') userId: number): Promise<AddressEntity> {
    return new AddressEntity(await this.addressesService.remove(+id, userId));
  }
}
