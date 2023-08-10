import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { Category } from './models/category';

@Injectable()
export class ProductsService {

  baseUrl: string = 'http://localhost:3000/products'

  constructor(
    private http: HttpClient,
  ) { }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories')
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl, {
      params: new HttpParams().set('category', categoryId)
    })
  }
}
