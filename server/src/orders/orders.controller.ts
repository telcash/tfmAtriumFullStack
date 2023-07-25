import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';
import { User } from 'src/users/decorators/user.decorator';

/**
 * Controlador del modulo {@link OrdersModule}
 */
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Endpoint para solicitar un listado de todas las ordenes
   * Disponible solo para Admins
   * @returns - Listado de ordenes
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  /**
   * Endppoint para solicitar una orden por su id
   * Disponible solo para Admins
   * @param id 
   * @returns 
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(+id);
  }

  /**
   * Endpoint para modificar una orden por su id
   * Disponible solo para Admins
   * @param id 
   * @param updateOrderDto 
   * @returns 
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.update(+id, updateOrderDto);
  }

  /**
   * Endpoint para eliminar una orden por su id
   * Disponible solo para Admins
   * @param id 
   * @returns 
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }

  /**
   * Endpoint para obtener todas las ordenes de un usuario autenticado
   */
  @UseGuards(JwtAccessGuard)
  @Get('/myorders')
  async findAllForUser(@User('sub') userId: number) {
    return await this.ordersService.findAllForUser(userId);
  }

  /**
   * Endpoint para obtener una orden por su id para un usuario autenticado
   * @param id 
   * @param userId 
   * @returns 
   */
  @UseGuards(JwtAccessGuard)
  @Get('/myorders/:id')
  async findOneForUser(@Param('id') id: string, @User('sub') userId: number) {
    return await this.ordersService.findOneForUser(+id, userId);
  }


}
