import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ProductAvailability } from 'src/products/constants/product-availability';
import { REQUEST } from '@nestjs/core';
import { UpdateCartItemDto } from '../cart-items/dto/update-cart-item.dto';

/**
 * Valida CreateCartItemDto: Valida si se puede actualizar el item en el carrito a la cantidad solicitada
 */
@Injectable({ scope: Scope.REQUEST})
export class UpdateCartItemPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req,
    private readonly productsService: ProductsService,  
  ) {}


  async transform(updateCartItemDto: UpdateCartItemDto, metadata: ArgumentMetadata) {
    
    // Extraemos del request el id del carrito
    const cartId = this.req.user.cart.id;

    // Si la cantidad es 0 o menos updateCartItemDto es válido
    if (updateCartItemDto.quantity <= 0) {
      return {...updateCartItemDto, cartId: cartId, quantity: 0 };
    }

    // Busca si el producto que se quiere agregar al carrito está disponible para venta
    const product = await this.productsService.findOne(updateCartItemDto.productId);
    
    // Si el producto no está disponible lanzamos error
    if (!product || product.availability === ProductAvailability.NEVER) {
      throw new BadRequestException("Product not available");
    }
    
    
    // Si el producto está disponible según stock, pero el stock es menor que lo
    // solicitado, lanzamos error
    if (
      product.availability === ProductAvailability.STOCK && 
      product.stock < updateCartItemDto.quantity
    ) {
        throw new BadRequestException("Insufficient product stock");
    }
      
    // En cualquier otro caso se puede agregar el item al carrito
    return {...updateCartItemDto, cartId: cartId};
  }
}
