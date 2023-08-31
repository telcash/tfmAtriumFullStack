import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ProductCategory } from '../models/product-category';
import { Category } from 'src/app/categories/models/category';
import { Observable, concat } from 'rxjs';
import { ProductCategoriesService } from '../product-categories.service';
import Validation from 'src/app/shared/validation';

/**
 * Componente que gestiona el formulario de creación de un producto
 */
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  // Clase que contiene validadores personalizados
  valid: Validation = new Validation()

  // Definición del formulario de creación de un producto
  productCreateForm = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
    ]),
    'description': new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(190),
    ]),
    'price': new FormControl<number>(0, [
      Validators.min(0),
      this.valid.numberValidator,
    ]),
    'stock': new FormControl<number>(0, [
      Validators.min(0),
      this.valid.numberValidator,
    ]),
    'availability': new FormControl(''),
    'image': new FormControl(null),
  });

  // Listado de todas las categorías, enlazadas via two way binding con el componente hijo ProductCategories
  categories: Category[] = [];

  // Atributo de tipo File para la carga de la imagen del producto
  file: File | null = null;

  constructor(
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private router: Router,
  ) {}

  /**
   * Método que procesa el envío de los datos del formulario para la creación de un producto
   */
  onSubmit() {

    // Objeto de tipo FormData que contendrá los datos a enviar del formulario
    const formData: FormData = new FormData();

    // Agrega las claves y valores del formulario al objeto formData
    Object.keys(this.productCreateForm.controls).forEach(key => {
      const value = this.productCreateForm.get(key)?.value;
      if(value && typeof value === 'string' ) {
        formData.append(key, value);
      }
    })

    // Si existe un archivo la anexa al objeto formData
    if (this.file) {
      formData.append('file', this.file);
    }

    // Crea un array de observables para crear el listado de peticiones de asignación de categoría al producto
    const obs: Observable<ProductCategory>[] = [];

    // LLamada al servicio para petición al API de creación de un producto
    this.productsService.createProduct(formData).subscribe(
      product => {

        // Para cada categoría en la lista de categorías se la asigna al nuevo producto
        for(const category of this.categories) {

          // Agrega un observable al array por cada categoría
          obs.push(this.productCategoriesService.addCategoryToProduct(
            {
              productId: product.id,
              categoryId: category.id!,
            }
          ))
        }

        // Si hay observables en el array se suscribe a ellos para hacer la peticíon al API
        if(obs.length > 0) {
          concat(...obs).subscribe(
            () => {

              // Navega a la tabla de productos
              this.goToProducts();
            }
          )
        } else {
          // Navega a la tabla de productos
          this.goToProducts();
        }
      }
    ); 
  }

  /**
   * Método que se ejecuta cuando se selecciona un archivo de imagen para el producto
   * @param event - Evento que se genera cuando se selecciona un archivo de imagen para el producto
   */
  onFileSelected(event: any) {

    // Asigna al atributo file el archivo seleccionado
    this.file = event.target.files[0];
  }

  /**
   * Método que navega al listado de productos
   */
  goToProducts() {
    this.router.navigateByUrl('admin/products');
  }
}
