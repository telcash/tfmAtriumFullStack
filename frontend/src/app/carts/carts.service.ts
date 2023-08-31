import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from './models/cart-item';
import { Cart } from './models/cart';
import { GlobalConstants } from '../config/global-constants';

/**
 * Servicio encargado de las peticiones a los endpoints '/carts/mycart' del API
 * Peticiones relacionadas con las funciones de carritos de compras
 */
@Injectable()
export class CartsService {

  // URLs base oara peticiones
  myCartUrl: string = GlobalConstants.API_URL + '/carts/mycart'
  itemsUrl: string = this.myCartUrl + '/items'

  constructor(private http: HttpClient) { }

  /**
   * Solicita al API un carrito de compras
   * @returns {Cart} - Carrito de compras
   */
  findCart(): Observable<Cart> {
    return this.http.get<Cart>(this.myCartUrl, {
      withCredentials: true,
    })
  }

  /**
   * Solicita al API la actualización de un carrito de compras
   * @param {Partial<Cart>} cart - Datos para actualizar el carrito de compras
   * @returns {Cart} - Carrito de compras actualizado
   */
  updateCart(cart: Partial<Cart>): Observable<Cart> {
    return this.http.patch<Cart>(this.myCartUrl, cart, {
      withCredentials: true,
    })
  }

  /**
   * Solicita al API todos los items en un carrito de compra
   * @returns {CartItem[]} - Listado de items
   */
  findAllItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.itemsUrl, {
      withCredentials: true,
    })
  }

  /**
   * Solicita al API agregar un item a un carrito de compra
   * @param {number} productId - Id del producto correspondiente al item
   * @param {number} quantity - Cantidad del item a agregar
   * @returns {CartItem} - Item agregado
   */
  addItemToCart(productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(this.itemsUrl, {
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true,
    })    
  }

  /**
   * Solicita al API actualizar un item en un carrito de compra
   * @param {number} productId - Id del producto correspondiente al item 
   * @param {number} quantity - Cantidad del item a actualizar 
   * @returns {CartItem} - Item actualizado
   */
  updateItem(productId: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(this.itemsUrl, {
      productId: productId,
      quantity: quantity,
    },
    {
      withCredentials: true,
    })
  }

  /**
   * Solicita al API la eliminación de un item de un carrito de compra
   * @param {number} productId - Id del producto correspondiente 
   * @returns {CartItem} - Item eliminado
   */
  deleteItem(productId: number): Observable<CartItem> {
    return this.http.delete<CartItem>(this.itemsUrl,{
      body: {
        productId: productId,
      },
      withCredentials: true,
    })
  }

  /**
   * Solicita al API el procesamiento de la compra de un carrito
   * @param {number} addressId - Id de la dirección asociada a la compra 
   * @returns {number} - Id de la orde de compra generada
   */
  checkout(addressId: number): Observable<number> {
    return this.http.post<number>(this.myCartUrl + '/checkout', {
      addressId: addressId,
    });
  }
}
