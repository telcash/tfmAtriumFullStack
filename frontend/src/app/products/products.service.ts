import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { GlobalConstants } from '../config/global-constants';

@Injectable()
export class ProductsService {

  url: string = GlobalConstants.API_URL + '/products';
  categoriesUrl: string = GlobalConstants.API_URL + '/categories';

  constructor(
    private http: HttpClient,
  ) {}

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  createProduct(product: any) {
    return this.http.post<any>(this.url, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.patch(`${this.url}/${id}`, product);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('category', categoryId),
      withCredentials: true,
    });
  }
  
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }

}
