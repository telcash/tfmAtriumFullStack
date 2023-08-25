import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: string = GlobalConstants.API_URL + '/orders';

  constructor(
    private http: HttpClient,
  ) { }

  getAllOrders() {
    return this.http.get<any>(this.url);
  }
}
