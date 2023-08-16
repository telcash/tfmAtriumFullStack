import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { Address } from './models/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  url = GlobalConstants.API_URL + '/addresses'

  constructor(private http: HttpClient) { }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.url);
  }

  createAddress(address: Partial<Address>): Observable<Address> {
    return this.http.post<Address>(this.url, address);
  }

  deleteAddress(id: number): Observable<Address> {
    return this.http.delete<Address>(`${this.url}/${id}`);
  }
}
