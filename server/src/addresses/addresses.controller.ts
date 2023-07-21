import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { User } from 'src/users/decorators/user.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';

/**
 * Controlador del modulo {@link AddressesModule}
 */
@UseGuards(JwtAccessGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@User('sub') id: number, @Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(id, createAddressDto);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
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
