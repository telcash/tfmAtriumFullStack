import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { Address } from './models/address';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de las peticiones a los endpoints '/addresses'  del API,
 * Peticiones relacionadas con las direcciones de usuario
 */
@Injectable()
export class AddressesService {

  // URL base para peticiones
  url = GlobalConstants.API_URL + '/addresses'

  constructor(private http: HttpClient) { }

  /**
   * Solicita al API un listado de todas las direcciones de un usuario
   * @returns - Listado de direcciones
   */
  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.url);
  }

  /**
   * Solicita al API una dirección de un usuario según el id de la dirección
   * @param {number} id - Id de la dirección
   * @returns - Dirección solicitada
   */
  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.url}/${id}`);
  }

  /**
   * Solicita al API la creación de una dirección de un usuario
   * @param {Address} address - Datos con la dirección a crear 
   * @returns - Dirección creada
   */
  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.url, address);
  }

  /**
   * Solicita al API la actualización de una dirección de un usuario
   * @param {number} id - Id de la dirección 
   * @param {Partial<Address>} address - Datos para la actualización 
   * @returns - Dirección actualizada
   */
  updateAddress(id: number, address: Partial<Address>): Observable<Address> {
    return this.http.patch<Address>(`${this.url}/${id}`, address);
  }
  
  /**
   * Solicita al API la eliminación de una dirección de un usuario
   * @param {number} id - Id de la dirección 
   * @returns - Dirección eliminada
   */
  deleteAddress(id: number): Observable<Address> {
    return this.http.delete<Address>(`${this.url}/${id}`);
  }

}
