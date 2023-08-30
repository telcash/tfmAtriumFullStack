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

  updateCart(cart: any): Observable<Cart> {
    return this.http.patch<Cart>(this.myCartUrl, cart)
  }

  findAllItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.itemsUrl, {
      withCredentials: true,
    })
  }

  addItemToCart(productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(this.itemsUrl, {
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true,
    })    
  }

  updateItem(productId: number, quantity: number) {
    return this.http.patch(this.itemsUrl, {
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true,
    })
  }

  deleteItem(productId: number): Observable<CartItem> {
    return this.http.delete<CartItem>(this.itemsUrl,{
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
