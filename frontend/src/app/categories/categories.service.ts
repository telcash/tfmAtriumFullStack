import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { Observable } from 'rxjs';
import { Category } from './models/category';

@Injectable()
export class CategoriesService {

  url: string = GlobalConstants.API_URL + '/categories'

  constructor(
    private http: HttpClient,  
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`)
  }

  createCategory(category: any) {
    return this.http.post<Category>(this.url, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  editCategory(id: number, category: any) {
    return this.http.patch(`${this.url}/${id}`, category);
  }
}
