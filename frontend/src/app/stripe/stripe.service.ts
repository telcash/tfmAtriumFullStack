import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  url = GlobalConstants.API_URL + '/stripe'

  constructor(private http: HttpClient) { }

  getPaymentIntent(orderId: number) {
    return this.http.get<any>(`${this.url}/${orderId}`);
  }

}
