import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { HttpClient } from '@angular/common/http';
import { Order } from './models/order';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de las peticiones al endpoint '/orders' del API
 * Peticiones relacionadas con órdenes de usuario
 */
@Injectable()
export class OrdersService {

  // URL base para las peticiones
  url: string = GlobalConstants.API_URL + '/orders';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Solicita al API un listado de todas las órdenes
   * @returns {Order[]} - Listado de todas las órdenes
   */
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  /**
   * Solicita al API, de parte de un cliente, un listado de todas sus órdenes
   * @returns {Order[]} - Listado de las órdenes
   */
  getAllUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/myorders`)
  }

  /**
   * Solicita al API una orden por su id
   * @param {number} orderId - Id de la orden
   * @returns {Orden} - Orden solicitada
   */
  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${orderId}`)
  }

  /**
   * Solicita al API la actualización de una orden
   * @param {number} orderId - Id de la orden 
   * @param {Partial<Order>} order - Datos para actualizar la orden
   * @returns {Order} - Orden actualizado
   */
  updateOrder(orderId: number, order: Partial<Order>): Observable<Order> {
    return this.http.patch<Order>(`${this.url}/${orderId}`, order)
  } 

  /**
   * Solicita al API, de parte de un cliente, una de sus ordenes por su id
   * @param {number} orderId - Id de la orden 
   * @returns {Order} - Orden solicitada
   */
  getUserOrder(orderId: number) {
    return this.http.get<Order>(`${this.url}/myorders/${orderId}`)
  }

  /**
   * Solicita al API, de parte de un cliente, la actualización de una de sus ordenes
   * @param {number} orderId - Id de la orden 
   * @param {Partial<Order>} order - Datos para actualizar la orden 
   * @returns {Order} - Orden actualizado
   */
  updateUserOrder(orderId:number, order: Partial<Order>): Observable<Order> {
    return this.http.patch<Order>(`${this.url}/myorders/${orderId}`, order)
  }

  /**
   * Solicita al API, de parte de un cliente, la eliminación de una de sus órdenes
   * @param {number} orderId - Id de la orden 
   * @returns {Order} - Orden eliminada
   */
  deleteUserOrder(orderId: number): Observable<Order> {
    return this.http.delete<Order>(`${this.url}/myorders/${orderId}`)
  }

}
