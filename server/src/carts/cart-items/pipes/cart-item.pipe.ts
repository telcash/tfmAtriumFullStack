import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ProductAvailability } from 'src/products/constants/product-availability';
import { REQUEST } from '@nestjs/core';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';

/**
 * Valida CreateCartItemDto o UpdateCartItemDto: Valida si se puede actualizar el item en el carrito a la cantidad solicitada.
 * Verifica que el producto esté disponible para la venta (Verificación de seguridad, los productos no disponibles no son visibles a un usuario tipo CLIENT).
 * Verifica que la cantidad del producto solicitada es válida: hay suficiente stock.
 * Si el producto tiene un valor de ALWAYS para la propiedad availability se considera disponible en cualquier cantidad (TODO: fijar un máximo).
 * Si el producto tiene un valor de NEVER para la propiedad availability no está disponible para la venta. El producto no debe ser visible en las peticiones de usuario tipo CLIENT.
 * Si el producto tiene un valor de STOCK para la propiedad availability está disponible para la venta según valor de la cantidad en propiedad STOCK.
 * Si no se cumplen las verificaciones se generan errores BadRequestException.
 * Si se cumplen las verificaciones se devuelve el DTO verificado.
 */
@Injectable({ scope: Scope.REQUEST})
export class CartItemPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req,
    private readonly productsService: ProductsService,  
  ) {}

  /**
   * Implementación del método transform() del pipe
   * @param updateCartItemDto - DTO con los datos a validar
   * @param metadata 
   * @returns - DTO validado
   */
  async transform(dto: CreateCartItemDto | UpdateCartItemDto, metadata: ArgumentMetadata) {
    // Extraemos del request el id del carrito
    const cartId = this.req.user.cart.id;
    

    // Si es una solicitud de borrado, se agrega el id del carrito al dto y se devuelve
    if(this.req.method === 'DELETE') {
      return {...dto, cartId: cartId};
    }

    // Busca si el producto que se quiere agregar al carrito está disponible para venta
    const product = await this.productsService.findOne(dto.productId);
    
    // Si el producto no está disponible lanzamos error
    if (!product || product.availability === ProductAvailability.NEVER) {
      throw new BadRequestException("Product not available");
    }
    
    // Si el producto está disponible según stock, pero el stock es menor que lo
    // solicitado, lanzamos error
    if (
      product.availability === ProductAvailability.STOCK && 
      product.stock < dto.quantity
    ) {
        throw new BadRequestException("Insufficient product stock");
    }
      
    // En cualquier otro caso se puede agregar el item al carrito

    // Devuelve el Dto agregándole el id del carrito correspondiente
    return {...dto, cartId: cartId, price: product.price};
  }
}
