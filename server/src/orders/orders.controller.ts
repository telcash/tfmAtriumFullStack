import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { StripeService } from 'src/stripe/stripe.service';

/**
 * Controlador del modulo {@link OrdersModule}
 */
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService, private readonly stripeService: StripeService) {}

  /**
   * 
   * @param createOrderDto 
   * @returns 
   */
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Post('checkout')
  async checkout(@Body('amount') amount: number) {
    console.log(amount);
    return await this.stripeService.createPaymentIntent(amount);
  }
}
