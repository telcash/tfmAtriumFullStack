import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateCartItemDto } from '../cart-items/dto/create-cart-item.dto';
import { ProductsService } from 'src/products/products.service';
import { Availability } from '@prisma/client';

/**
 * Valida CreateCartItemDto: Valida si el item está disponible y/o si hay suficiente cantidad en stock
 */
@Injectable()
export class AddItemToCartPipe implements PipeTransform {
  constructor(private readonly productsService: ProductsService) {}

  async transform(createCartItemDto: CreateCartItemDto, metadata: ArgumentMetadata) {

    // Busca el producto que se quiere agregar al carrito
    const product = await this.productsService.findOne(createCartItemDto.productId);

    // Si el producto no está disponible lanzamos error
    if (product.availability === Availability.NEVER) {
      throw new BadRequestException('Product not available');
    }

    // Si el producto está disponible según stock, pero el stock es menor que lo
    // solicitado, lanzamos error
    if (product.availability === Availability.STOCK && product.stock < createCartItemDto.quantity) {
      throw new BadRequestException("Insufficient product stock");
    }

    // En cualquier otro caso se puede agregar el item al carrito
    return createCartItemDto;
  }
}
