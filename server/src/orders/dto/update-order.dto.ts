import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

/**
 * Dto para la actualización de una orden
 */
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
