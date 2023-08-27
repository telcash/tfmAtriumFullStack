import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';
import { User } from 'src/users/decorators/user.decorator';
import { OrdersInterceptor } from './interceptor/orders/orders.interceptor';

/**
 * Controlador del modulo {@link OrdersModule}
 */
@UseGuards(JwtAccessGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Endpoint para solicitar un listado de todas las ordenes
   * Disponible solo para Admins
   * @returns - Listado de ordenes
   */
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  /**
   * Endpoint para obtener todas las ordenes de un usuario autenticado
   */
  @Get('/myorders')
  async findAllForUser(@User('sub') userId: number) {
    return await this.ordersService.findAllForUser(userId);
  }

  /**
   * Endppoint para solicitar una orden por su id
   * Disponible solo para Admins
   * @param id 
   * @returns 
   */
  @UseGuards(RoleGuard)
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
  @UseGuards(RoleGuard)
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
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }

  /**
   * Endpoint para obtener una orden por su id para un usuario autenticado
   * @param id 
   * @param userId 
   * @returns 
   */
  @Get('/myorders/:id')
  async findOneForUser(@Param('id') id: string, @User('sub') userId: number) {
    return await this.ordersService.findOneForUser(+id, userId);
  }
  
  @UseInterceptors(OrdersInterceptor)
  @Patch('/myorders/:id')
  async updateOneForUser(@Param('id') id: string, @User('sub') userId: number, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.updateOneForUser(+id, userId, updateOrderDto);
  }

  /**
   * Endpoint para eliminar una orden por su id para un usuario autenticado
   */
  @Delete('/myorders/:id')
  async removeOneForUser(@Param('id') id: string, @User('sub') userId: number) {
    return await this.ordersService.removeOneForUser(+id, userId);
  }

}
