import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { User } from 'src/users/decorators/user.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';
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
   * Endpoint para solicitar todas las direcciones
   * Disponible solo para Admins
   * @returns - Listado de direcciones
   */
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    return await this.addressesService.findAll();
  }

  /**
   * Endpoint para solicitar un usuario una dirección
   * @param id 
   * @returns 
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @User('sub') userId: number): Promise<AddressEntity> {
    return await this.addressesService.findOne(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
