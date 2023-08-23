import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from './models/cart-item';
import { Cart } from './models/cart';
import { GlobalConstants } from '../config/global-constants';

@Injectable()
export class CartsService {

  myCartUrl: string = GlobalConstants.API_URL + '/carts/mycart'
  itemsUrl: string = this.myCartUrl + '/items'

  constructor(private http: HttpClient) { }

  findCart(): Observable<Cart> {
    return this.http.get<Cart>(this.myCartUrl, {
      withCredentials: true,
    })
  }

  updateCart(cart: Partial<Cart>): Observable<Cart> {
    return this.http.patch<Cart>(this.myCartUrl, cart)
  }

  findAllItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.itemsUrl, {
      withCredentials: true,
    })
  }

  addItemToCart(productId: number, quantity: number) {
    return this.http.post(this.itemsUrl, {
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true
    })    
  }

  deleteItem(productId: number) {
    return this.http.delete(this.itemsUrl,{
      body: {
        productId: productId,
      },
      withCredentials: true,
    })
  }

  checkout(addressId: number): Observable<any> {
    return this.http.post(this.myCartUrl + '/checkout', {
      addressId: addressId,
    });
  }
}
