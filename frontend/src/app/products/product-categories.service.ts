import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { Observable } from 'rxjs';
import { ProductCategory } from './models/product-category';

@Injectable()
export class ProductCategoriesService {

  constructor(
    private http: HttpClient,
  ) { }

  url: string = GlobalConstants.API_URL + '/product-categories'

  addCategoryToProduct(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(this.url, productCategory);
  }

  removeCategoryOfProduct(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.delete<ProductCategory>(this.url, {
      body: productCategory,
    })
  }
}
