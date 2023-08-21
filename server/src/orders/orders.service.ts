import { Injectable } from '@nestjs/common';
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
   * @returns - Listado de las ordenes
   */
  async findAll() {
    return await this.ordersRepository.findAll();
  }

  async findOne(id: number) {
    return await this.ordersRepository.findOne(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.ordersRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.ordersRepository.remove(id);
  }

  async findAllForUser(userId: number) {
    return await this.ordersRepository.findAllForUser(userId);
  }

  async findOneForUser(id: number, userId: number) {
    return await this.ordersRepository.findOneForUser(id, userId);
  }
}