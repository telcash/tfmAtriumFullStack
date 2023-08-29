import { Injectable, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';


@Injectable()
export class OrdersService {

  constructor(private readonly ordersRepository: OrdersRepository) {}

  /**
   * Maneja la creación de una nueva orden
   * Invoca al método create() de {@link OrdersRepository} para crear la orden en la base de datos
   * @param {CreateOrderDto} createOrderDto - Dto para crear la orden 
   * @param items - Listado de productos que contiene la orden
   * @returns - Orden creada
   */
  async create(createOrderDto: CreateOrderDto, items) {
    return await this.ordersRepository.create(createOrderDto, items);
  }

  /**
   * Gestiona la busqueda de un listado de todas las ordenes
   * Disponible solo para Administradores
   * Invoca al método findAll() de {@link OrdersRepository} para hacer la busqueda
   * @returns - Listado de las ordenes
   */
  async findAll() {
    return await this.ordersRepository.findAll();
  }

  /**
   * Gestiona la busqueda de una orden en la base de datos
   * Invoca al método findOne() de {@link OrdersRepository} para hacer la busqueda
   * @param {number} id - Id de la orden 
   * @returns - Orden buscada
   */
  async findOne(id: number) {
    return await this.ordersRepository.findOne(id);
  }

  /**
   * Gestiona la actualización de una orden en la base de datos
   * Invoca al método update() de {@link OrdersRepository} para hacer la actualización
   * @param {number} id - Id de la orden
   * @param {UpdateOrderDto} updateOrderDto - DTO con los datos para actualizar 
   * @returns - Orden actualizada
   */
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.ordersRepository.update(id, updateOrderDto);
  }

  /**
   * Gestiona la eliminación de una orden de la base de datos
   * Invoca al método remove() de {@link OrdersRepository} para eliminar la orden
   * @param {number} id - Id de la orden 
   * @returns - Orden eliminada
   */
  async remove(id: number) {
    return await this.ordersRepository.remove(id);
  }

  /**
   * Gestiona la busqueda de todas las ordenes de un usuario
   * Invoca al método findAllForUser() de {@link OrdersRepository} para gestionar la busqueda
   * @param {number} userId - Id del usuario
   * @returns - Listado de ordenes buscadas
   */
  async findAllForUser(userId: number) {
    return await this.ordersRepository.findAllForUser(userId);
  }

  /**
   * Gestiona la busqueda de una orden para un usuario
   * Invoca al método findOneForUser() de {@link OrdersRepository} para gestionar la busqueda
   * @param {number} id - Id de la orden 
   * @param {number} userId - Id del usuario 
   * @returns - Orden buscada
   */
  async findOneForUser(id: number, userId: number) {
    return await this.ordersRepository.findOneForUser(id, userId);
  }

  /**
   * Gestiona la actualización de una orden para un usuario
   * Invoca el metodo updateOneForUser de {@link OrdersRepository} para gestionar la actualización
   * @param {number} id - Id de la orden
   * @param {number} userId - Id del usuario
   * @param {number} updateOrderDto - Dto con los datos a actualizar
   * @returns - Orden actualizada
   */
  async updateOneForUser(id: number, userId: number, updateOrderDto: UpdateOrderDto) {
    return await this.ordersRepository.updateOneForUser(id, userId, updateOrderDto);
  }

  /**
   * Gestiona la eliminación de una orden para un usuario
   * Invoca el metodo removeOneForUser de {@link OrdersRepository} para gestionar la actualización
   * @param {number} id 
   * @param {number} userId 
   * @returns - Orden eliminada 
   */
  async removeOneForUser(id: number, userId: number) {
    return await this.ordersRepository.removeOneForUser(id, userId)
  }

  /**
   * Gestiona la busqueda de una orden según su paymentIntent de Stripe
   * @param {string} paymentIntent - paymentIntent de Stripe
   * @returns - Orden buscada
   */
  async findByPaymentIntent(paymentIntent: string) {
    return await this.ordersRepository.findByPaymentIntent(paymentIntent);
  }
}