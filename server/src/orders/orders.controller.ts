import { Controller, Get, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';
import { User } from 'src/users/decorators/user.decorator';
import { UpdateOrderInterceptor } from './interceptors/update-order.interceptor';
import { DeleteOrderInterceptor } from './interceptors/delete-order.interceptor';
import { UpdateOrderPipe } from './pipes/update-order.pipe';
import { OrderEntity } from './entities/order.entity';

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
  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.ordersService.findAll();
    return orders.map((order) => new OrderEntity(order))
  }

  /**
   * Endpoint para obtener todas las ordenes de un usuario autenticado
   * @param {number} userId - Id del usuario
   * @returns - Listado de ordenes del usuario
   */
  @Get('/myorders')
  async findAllForUser(@User('sub') userId: number): Promise<OrderEntity[]> {
    const orders = await this.ordersService.findAllForUser(userId);
    return orders.map((order) => new OrderEntity(order))
  }

  /**
   * Endppoint para solicitar una orden por su id
   * Disponible solo para Admins
   * @param {number} id - Id de la orden
   * @returns - Orden solicitada
   */
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.findOne(+id));
  }

  /**
   * Endpoint para modificar una orden por su id
   * Disponible solo para Admins
   * @param {number} id - Id de la orden 
   * @param {UpdateOrderDto} updateOrderDto - Dto con los datos de actualización 
   * @returns - Orden modificada
   */
  @UseInterceptors(UpdateOrderInterceptor)
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(UpdateOrderPipe) updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.update(+id, updateOrderDto));
  }

  /**
   * Endpoint para eliminar una orden por su id
   * Disponible solo para Admins
   * @param {number} id - Id de la orden 
   * @returns - Orden eliminada
   */
  @UseInterceptors(DeleteOrderInterceptor)
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.remove(+id));
  }

  /**
   * Endpoint para obtener una orden por su id para un usuario autenticado
   * @param {number} id - Id de la orden
   * @param {number} userId - Id del usuario 
   * @returns - Orden solicitada
   */
  @Get('/myorders/:id')
  async findOneForUser(@Param('id') id: string, @User('sub') userId: number): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.findOneForUser(+id, userId));
  }
  
  /**
   * Endpoint para actualizar una orden por su id para un usuario autenticado
   * @param {number} id - Id de la orden 
   * @param {number} userId - Id del usuario
   * @param {UpdateOrderDto} updateOrderDto - Dto con los datos de actualización
   * @returns - Orden actualizada
   */
  @UseInterceptors(UpdateOrderInterceptor)
  @Patch('/myorders/:id')
  async updateOneForUser(@Param('id') id: string, @User('sub') userId: number, @Body(UpdateOrderPipe) updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.updateOneForUser(+id, userId, updateOrderDto));
  }

  /**
   * Endpoint para eliminar una orden por su id para un usuario autenticado
   * @param {number} id - Id de la orden
   * @param {number} userId - Id del usuario 
   * @returns - Orden eliminada
   */
  @UseInterceptors(DeleteOrderInterceptor)
  @Delete('/myorders/:id')
  async removeOneForUser(@Param('id') id: string, @User('sub') userId: number): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.removeOneForUser(+id, userId));
  }

}
