import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from './models/cart-item';

@Injectable()
export class CartsService {

  constructor(private http: HttpClient) { }

  findAllItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>('http://localhost:3000/carts/mycart/items', {
      withCredentials: true,
    })
  }

  addItemToCart(productId: number, quantity: number) {
    return this.http.post('http://localhost:3000/carts/mycart/items', {
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true
    })    
  }

  deleteItem(productId: number) {
    return this.http.delete('http://localhost:3000/carts/mycart/items',{
      body: {
        productId: productId,
      },
      withCredentials: true,
    })
  }
}
