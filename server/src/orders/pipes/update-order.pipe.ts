import { ArgumentMetadata, ForbiddenException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderStatus } from '../constants/order-status';

/**
 * Pipe que verifica el DTO {@link UpdateOrderDto} para actualización de órdenes
 */
@Injectable()
export class UpdateOrderPipe implements PipeTransform {

  /**
   * Implementación del método transform del Pipe
   * @param {UpdateOrderDto} updateOrderDto - Dto con los datos de actualización
   * @param {ArgumentMetadata} metadata 
   * @returns - DTO validado
   */
  transform(updateOrderDto: UpdateOrderDto, metadata: ArgumentMetadata) {
    
    // Extrae el valor del status del dto
    const status = updateOrderDto.status;

    // Si el valor de status recibido es un valor que sólo puede ser asignado por el sistema
    // y no por un usuario, lanza un error
    if(status === OrderStatus.STARTED || status === OrderStatus.WAITING_PAYMENT || status === OrderStatus.PAID ) {
      throw new ForbiddenException('Status valiue not allowed')
    }

    // Filtra el dto, dejando solo la propiedad status, las otras propiedades sólo pueden ser modificadas por el sistema
    const filteredUpdateOrderDto: UpdateOrderDto = { status: status}
    
    // Retorna el dto
    return filteredUpdateOrderDto;
  }
}
