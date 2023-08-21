import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AddressesService } from 'src/addresses/addresses.service';
import { CreateCartItemDto } from 'src/carts/cart-items/dto/create-cart-item.dto';
import { CheckoutCartDto } from 'src/carts/dto/checkout-cart.dto';
import { OrderStatus } from 'src/orders/constants/order-status';
import { UserRole } from 'src/users/constants/user-role';
import { UsersService } from 'src/users/users.service';

@Injectable({ scope: Scope.REQUEST })
export class CheckoutPipe implements PipeTransform {

  constructor(
    @Inject(REQUEST) private readonly req,
    private readonly usersService: UsersService,
    private readonly addressesService: AddressesService,
  ) {}

  async transform(checkoutCartDto: CheckoutCartDto, metadata: ArgumentMetadata) {
    // Agregamos el carrito al dto
    checkoutCartDto.cart = this.req.user.cart;

    // Verificamos si el carrito esta vacío, si lo está, lanzamos un error
    if(checkoutCartDto.cart.items.length === 0) {
      throw new BadRequestException("Cart is empty");
    }

    // Verificamos si hay un usuario autenticado, si lo hay pasamos el id en el dto
    if(this.req.user.sub) {
      checkoutCartDto.userId = this.req.user.sub;
    } else {
      // Si no lo hay verificamos que el usuario tipo GUEST existe, si existe, el id recibido en el dto es válido
      const user = await this.usersService.findUserById(checkoutCartDto.userId);

      // Si no existe el usuario lanzamos un error
      if(!user) {
        throw new BadRequestException("User does not exist");
      }

      // Si el usuario existe y no es GUEST debe iniciar sesión para completar
      // Devolvemos un error
      if(user.role !== UserRole.GUEST) {
        throw new BadRequestException("User exists, you need to log in")
      }
    }

    // Verificamos que la dirección pertenece al usuario, si no, lanzamos un error
    const address = await this.addressesService.findOne(checkoutCartDto.addressId, checkoutCartDto.userId);
    if(!address) {
      throw new BadRequestException('The user has not registered the shipping address provided');
    }

    // Creamos y agregamos el createOrderDto al checkoutOrderDto
    checkoutCartDto.createOrderDto = {
      userId: checkoutCartDto.userId,
      total: checkoutCartDto.cart.total,
      status: OrderStatus.STARTED,
      stripeClientSecret: '',
      addressId: checkoutCartDto.addressId,
    }

    // Mapeamos el listado de productos como items de orden para la creación conjunta con la orden
    const cartItems: CreateCartItemDto[] = [];
    for(const item of checkoutCartDto.cart.items) {
      const {cartId, createdAt, updatedAt, ...cartItem} = item;
      cartItems.push(cartItem);
    }
    checkoutCartDto.items = cartItems;

    // Devolvemos el dto
    return checkoutCartDto;
  }
}
