import { Injectable, ServiceUnavailableException} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartsRepository } from './carts.repository';
import { CartItemsService } from './cart-items/cart-items.service';
import { StripeService } from 'src/stripe/stripe.service';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly cartItemsService: CartItemsService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly stripeService: StripeService,
  ) {}

  /**
   * Crea un carrito con un id de usuario registrado correspondiente
   * Si el Dto no contiene un valor de userId crea un carrito sin usuario registrado correspondiente (carrito para invitados)
   * Invoca al método create() de {@link CartsRepository} para crear el carrito en la base de datos
   * @param {CreateCartDto} createCartDto - Id del usuario
   * @returns - Carrito creado
   */
  async create(createCartDto: CreateCartDto) {
    return await this.cartsRepository.create(createCartDto);
  }

  /**
   * Gestiona la busqueda de todos los carritos existentes
   * Invoca al método findAll() de {@link CartsRepository} para buscar todos los carritos en la base de datos
   * @returns - Listado de carritos
   */
  async findAll() {
    return await this.cartsRepository.findAll();
  }

  /**
   * Realiza la busqueda de un carrito por su id
   * Invoca al método findOneById() de {@link CartsRepository} para buscar el carrito en la base de datos
   * @param cartId - Id del carrito
   * @returns - Carrito buscado
   */
  async findOne(id: number) {
    return await this.cartsRepository.findOne(id);
  }

  /**
   * Realiza la busqueda de un carrito asociado a un id de usuario registrado
   * Invoca al método findOneByUserId() de {@link CartsRepository} para realizar la busqueda en la base de datos
   * @param userId - Id del usuario
   * @returns - Carrito buscado
   */
  async findOneByUserId(userId: number) {
    return await this.cartsRepository.findOneByUserId(userId)
  }

  /**
     * Vacia el carrito de un usuario
     * Elmina todos los items que estén el carrito
     * Invoca al método removeAllFromCart() de {@link CartsRepository} para eliminar todos los items del carrito en la base de datos
     * @param {number} cartId - Id del carrito a vaciar
     * @returns - Carrito vacío
     */
  async emptyCart(cartId: number) {
    // Eliminamos todos los items en el carrito
    await this.cartItemsService.removeAll(cartId);
    // Devolvemos el carrito vacío con una propiedad total de cero
    return await this.cartsRepository.update(cartId, { total: 0 });
  }

  /**
   * Actualiza la propiedad total del carrito
   * Calcula el total del carrito iterando en todos los productos que contiene
   * Invoca el método update() de {@link CartsRepository} para actualizar el carrito con su nuevo total en la base de datos
   * @param cartId - Id del carrito
   * @returns - Nuevo total actualizado
   */
  async updateTotal(cartId: number): Promise<number> {
    // Busca el carrito por su id
    let cart = await this.cartsRepository.findOne(cartId);

    // Inicia el total en cero
    let total = 0;

    // Para cada item(producto) en el carrito multiplica su precio por la cantidad y lo agrega al total
    for (const item of cart.items) {
      total += item.price * item.quantity
    }

    // Actualiza el carrito en la base de datos
    cart = await this.cartsRepository.update(cartId, { total: total })

    // Devuelve el total
    return total;
  }

  async updateMyCart(cartId: number, updateCartDto: UpdateCartDto) {
    //Actualiza el carrito en la base de datos
    return await this.cartsRepository.update(cartId, updateCartDto)
  }

  /**
   * Realiza el checkout de un carrito
   * @param {CheckoutCartDto} checkoutCartDto - Dto con los datos para realizar el checkout
   * @returns - Objecto con propiedad clientSecret con la clave de Stripe para el pago
   */
  async checkout(checkoutCartDto: CheckoutCartDto) {
    // Actualiza el stock de todos los productos comprados
    await this.productsService.updateOnCartCheckout(checkoutCartDto.cart.items);
    
    // Envía a Stripe la solicitud de intento de pago
    const amount = checkoutCartDto.cart.total * 100;
    const paymentIntent = await this.stripeService.createPaymentIntent(amount)
      
      // Si hay un error en la solicitud revertimos el stock de los productos
      // Devolvemos un error
      .catch(async () => {
        await this.productsService.rollbackCartCheckout(checkoutCartDto.cart.items);
        throw new ServiceUnavailableException("Can't connect to payment gateway")
    })

    // Creamos una nueva orden para el cliente
    checkoutCartDto.createOrderDto.stripeClientSecret = paymentIntent.client_secret;
    await this.ordersService.create(checkoutCartDto.createOrderDto, checkoutCartDto.items);

    // Vaciamos el carrito
    await this.emptyCart(checkoutCartDto.cart.id);
    
    // Enviamos al cliente el secreto del paymentIntent
    return { clientSecret: paymentIntent.client_secret}
  }
}

