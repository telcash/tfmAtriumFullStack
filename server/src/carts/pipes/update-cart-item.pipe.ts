import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CreateCartItemDto } from '../cart-items/dto/create-cart-item.dto';
import { ProductsService } from 'src/products/products.service';
import { ProductAvailability } from 'src/products/constants/product-availability';
import { REQUEST } from '@nestjs/core';

/**
 * Valida CreateCartItemDto: Valida si el item está disponible y/o si hay suficiente cantidad en stock
 */
@Injectable({ scope: Scope.REQUEST})
export class UpdateCartItemPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req,
    private readonly productsService: ProductsService,  
  ) {}


  async transform(createCartItemDto: CreateCartItemDto, metadata: ArgumentMetadata) {
    
    // Determinamos el id del carrito 

    // Id del carrito si es un invitado
    if(this.req.signedCookies['cartId']) {
      
    }

    // Si la nueva cantidad del item es 0 (o menos) lo eliminamos del carrito


    // Busca si el producto que se quiere agregar al carrito está disponible para venta
    const product = await this.productsService.findOne(createCartItemDto.productId);

    // Si el producto no está disponible lanzamos error
    if (!product || product.availability === ProductAvailability.NEVER) {
      throw new BadRequestException('Product not available');
    }

    // Si el producto está disponible según stock, pero el stock es menor que lo
    // solicitado, lanzamos error
    if (
      product.availability === ProductAvailability.STOCK && 
      product.stock < createCartItemDto.quantity
    ) {
      throw new BadRequestException("Insufficient product stock");
    }

    // En cualquier otro caso se puede agregar el item al carrito
    return createCartItemDto;
  }
}
