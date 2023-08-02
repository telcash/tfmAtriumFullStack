import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  addItemToCart(productId: number, quantity: number) {
    return this.http.post('http://localhost:3000/carts/mycart/items', {
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true
    })    
  }

}
