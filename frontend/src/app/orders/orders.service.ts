import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { HttpClient } from '@angular/common/http';
import { Order } from './models/order';

@Injectable()
export class OrdersService {

  url: string = GlobalConstants.API_URL + '/orders';

  constructor(
    private http: HttpClient,
  ) { }

  getAllOrders() {
    return this.http.get<any>(this.url);
  }

  getAllUserOrders() {
    return this.http.get<Order[]>(`${this.url}/myorders`)
  }

  getUserOrder(orderId: number) {
    return this.http.get<Order>(`${this.url}/myorders/${orderId}`)
  }

  updateUserOrder(orderId:number, order: any) {
    return this.http.patch<Order>(`${this.url}/myorders/${orderId}`, order)
  }

  deleteUserOrder(orderId: number) {
    return this.http.delete<Order>(`${this.url}/myorders/${orderId}`)
  }

}
