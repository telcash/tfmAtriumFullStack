import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { UpdateOrderDto } from '../dto/update-order.dto';
export declare class UpdateOrderPipe implements PipeTransform {
    transform(updateOrderDto: UpdateOrderDto, metadata: ArgumentMetadata): UpdateOrderDto;
}
