import { Controller, Post, Body, Patch, Delete, UseInterceptors, Get } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { SetRequestUserInterceptor } from 'src/auth/interceptors/set-req-user.interceptor';
import { SetRequestUserCartInterceptor } from '../interceptors/set-request-user-cart.interceptor';
import { CartItemPipe } from './pipes/cart-item.pipe';
import { CartItemEntity } from './entities/cart-item.entity';
import { User } from 'src/users/decorators/user.decorator';
import { UpdateTotalInterceptor } from '../interceptors/update-total.interceptor';
import { SetCartItemCookieInterceptor } from '../interceptors/set-cart-item-cookie.interceptor';

@Controller('carts/mycart/items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  /**
   * Endpoint para solicitar todos los items en un carrito
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor, SetCartItemCookieInterceptor)
  @Get()
  async findAllItems(@User('cart') cart): Promise<CartItemEntity[]> {
    const items = await this.cartItemsService.findAll(cart.id);
    return items.map((item) => new CartItemEntity(item));
  }
  
  /**
   * Endpoint para solicitud de agregar item a un carrito
   * El valor de la propiedad quantity en el DTO será la nueva cantidad establecida del item en el carrito
   * Dto validado por class-validator y {@link CartItemPipe}
   * {@link SetRequestUserInterceptor} agrega la entidad user al request
   * {@link SetRequestUserCartInterceptor} determina el carrito correspondiente al usuario
   * {@link UpdateTotalInterceptor} actualiza la propiedad total del carrito
   * @param {CreateCartItemDto} createCartItemDto 
   * @returns {CartItemEntity} - Item creado
   */
  @UseInterceptors(
    SetRequestUserInterceptor,
    SetRequestUserCartInterceptor,
    UpdateTotalInterceptor,
    SetCartItemCookieInterceptor,
  )
  @Post()
  async upsert(@Body(CartItemPipe) createCartItemDto: CreateCartItemDto): Promise<CartItemEntity> {
    return new CartItemEntity(await this.cartItemsService.upsert(createCartItemDto));
  }
  
  /**
   * Endpoint para solicitud de actualizar un item de un carrito
   * El valor de la propiedad quantity en el DTO será la nueva cantidad establecida del item en el carrito
   * Dto validado por class-validator y {@link CartItemPipe}
   * {@link SetRequestUserInterceptor} agrega la entidad user al request
   * {@link SetRequestUserCartInterceptor} determina el carrito correspondiente al usuario
   * {@link UpdateTotalInterceptor} actualiza la propiedad total del carrito
   * @param {UpdateCartItemDto} updateCartItemDto 
   * @returns {CartItemEntity} - Item actualizado
  */
  @UseInterceptors(
    SetRequestUserInterceptor,
    SetRequestUserCartInterceptor,
    UpdateTotalInterceptor,
    SetCartItemCookieInterceptor,
  )
  @Patch()
  async update(@Body(CartItemPipe) updateCartItemDto: UpdateCartItemDto): Promise<CartItemEntity> {
    return new CartItemEntity(await this.cartItemsService.update(updateCartItemDto));
  }

  /**
   * Endpoint para eliminar un item de un carrito
   * Dto validado por class-validator y {@link CartItemPipe}
   * {@link SetRequestUserInterceptor} agrega la entidad user al request
   * {@link SetRequestUserCartInterceptor} determina el carrito correspondiente al usuario
   * {@link UpdateTotalInterceptor} actualiza la propiedad total del carrito
   * @param {UpdateCartItemDto} updateCartItemDto 
   * @returns {CartItemEntity} - Item eliminado
   */
  @UseInterceptors(
    SetRequestUserInterceptor,
    SetRequestUserCartInterceptor,
    UpdateTotalInterceptor,
    SetCartItemCookieInterceptor,
  )
  @Delete()
  async remove(@Body(CartItemPipe) updateCartItemDto: UpdateCartItemDto): Promise<CartItemEntity> {
    return await this.cartItemsService.remove(updateCartItemDto);
  }
}
