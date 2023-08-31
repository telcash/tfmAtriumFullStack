import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../config/global-constants';
import { Observable } from 'rxjs';
import { Category } from './models/category';

/**
 * Servicio encargado de las peticiones al endpoint '/categories' del API
 * Peticiones relacionadas con las categorías de productos
 */
@Injectable()
export class CategoriesService {

  // URL base para peticiones
  url: string = GlobalConstants.API_URL + '/categories'

  constructor(
    private http: HttpClient,  
  ) { }

  /**
   * Solicita al API un listado de todas las categorías
   * @returns {Category[]} - Listado de categorías
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  /**
   * Solicita al API una categoría por su Id
   * @param {number} id - Id de la categoría 
   * @returns {Category} - Categoría buscada
   */
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`)
  }

  /**
   * Solicita al API la creación de una categoría
   * @param {Category} category - Datos para la creación de la categoría
   * @returns {Category} - Categoría creada
   */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }

  /**
   * Solicita al API la eliminación de una categoría
   * @param {number} id - Id de la categoría 
   * @returns {Category} - Categoría creada
   */
  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/${id}`);
  }

  /**
   * Solicita al API la actualización de una categoría
   * @param {number} id - Id de la categoría
   * @param {Category} category - Datos para la edición de la categoría 
   * @returns {Category} - Categoría actualizada
   */
  editCategory(id: number, category: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.url}/${id}`, category);
  }
}
