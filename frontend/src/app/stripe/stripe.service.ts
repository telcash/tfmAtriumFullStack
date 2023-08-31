import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';

/**
 * Servicio encargado de las solicitudes al endpoint '/stripe' del API
 */
@Injectable({
  providedIn: 'root'
})
export class StripeService {

  url = GlobalConstants.API_URL + '/stripe'

  constructor(private http: HttpClient) { }

  /**
   * Solicita al API un paymentIntent para una orden
   * @param {number} orderId - Id de la orden 
   * @returns 
   */
  getPaymentIntent(orderId: number) {
    return this.http.get<any>(`${this.url}/${orderId}`);
  }

}
