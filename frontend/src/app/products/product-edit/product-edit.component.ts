import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/config/global-constants';
import { Category } from 'src/app/categories/models/category';
import { Observable, concat } from 'rxjs';
import { ProductCategory } from '../models/product-category';
import { ProductCategoriesService } from '../product-categories.service';
import Validation from 'src/app/shared/validation';

/**
 * Componente que gestiona el formulario de edición de un producto
 */
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  //Clase que contiene validadores personalizados
  valid: Validation = new Validation()

  // Definición del formulario de edición de un producto
  productEditForm = new FormGroup({
    'name': new FormControl('', [
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
    'image': new FormControl(''),
  });

  product!: Product;

  // Listado de todas las categorías, enlazadas via two way binding con el componente hijo ProductCategories
  categories: Category[] = [];

  // Atributo de tipo File para la carga de la imagen del producto
  file: File | null = null;


  imgUrl: string = GlobalConstants.API_STATIC_PRODUCTS_IMG;

  constructor(
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // Invoca el método que hace la carga de los valores iniciales del componente
    this.loadInitialValues();
  }
  
  /**
   * Método que ejecuta la inicialización del componente
   */
  loadInitialValues() {

    // Obtiene el id del producto del parámetro del URL
    const productId = this.route.snapshot.params['id'];

    // LLamada al servicio para solicitud al API del producto a editar
    this.productsService.getProduct(productId).subscribe(
      product => {

        // Inicializa el atributo product
        this.product = product;

        // Inicializa el listado de categorías
        this.categories = [...this.product.categories];
        
        // Carga los valores iniciales en el formulario
        this.setFormValues(this.product);

        // Marca el formulario como pristine para controlar la vista
        this.productEditForm.markAsPristine();
      }
    )
  }

  /**
   * Método que controla el envío de los datos del formulario
   */
  onSubmit() {

    if(this.productEditForm.valid) {

      // Obtiene el id del producto del parámetro del URL
      const productId = this.route.snapshot.params['id'];

      // Objeto de tipo FormData que contendrá los datos a enviar del formulario
      const formData: FormData = new FormData();

      // Agrega las claves y valores del formulario al objeto formData
      Object.keys(this.productEditForm.controls).forEach(key => {
        const value = this.productEditForm.get(key)?.value;
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
  
      // Verificación para cada categoría del producto
      for(const category of this.product.categories) {
        
        // Verifica para cada categoría del nuevo listado si está ya pertenece al producto
        if(this.categories.map(category => category.id).includes(category.id)) {
          
          // Si ya pertenece se elimina de la lista de nuevas categorías
          this.categories.splice(this.categories.indexOf(category), 1)
        } else {

          // Si la categoría del producto no está en la nueva lista, se crea un observable para su eliminación posterior
          obs.push(this.productCategoriesService.removeCategoryOfProduct({productId: this.product.id, categoryId: category.id!}))
        }
      }
  
      // Par las categorías que queden en el listado de nuevas categorías se crean observables para agregarlas al producto
      for(const category of this.categories) {
        obs.push(this.productCategoriesService.addCategoryToProduct(
          {
            productId: this.product.id,
            categoryId: category.id!,
          }
        ))
      }
  
      // Suscripción a los observables de eliminación y creación de categorías del producto
      // Invoca al servicio para las solicitudes al API
      concat(...obs).subscribe();
       
      // LLamada al servicio para solicitud al API de actualización del producto
      this.productsService.updateProduct(productId, formData).subscribe(
        () => {
          this.router.navigateByUrl('/admin/products');
        }
      );
    }

  }

  /**
   * Método que realiza la carga de los datos del producto en los campos del formulario
   * @param product 
   */
  setFormValues(product: Product) {
    this.productEditForm.setValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      availability: product.availability,
      image: product.image,
    })
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
   * Método que actualiza el valor de imagen a '' si se elimina la imagen del producto
   * Marca el formulario como dirty para controlar la vista
   */
  updateImage() {
    this.product.image = '';
    this.productEditForm.markAsDirty();
  }

}
