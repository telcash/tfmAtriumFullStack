import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Category } from 'src/app/categories/models/category';

/**
 * Componente que gestiona el campo de formulario para escoger las categorías de un producto
 */
@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  // Definición del campo del formulario
  categoryCtrl = new FormControl('');

  // Listado de categorías filtradas, como Observable
  filteredCategories!: Observable<Category[]>;

  // Listado de todas las categorías
  allCategories: Category[] = [];

  // Atributo de entrada con las categorías actuales del producto
  @Input() categories!: Category[];

  // Evento que se emite al padre cuando hay cambios en las categorías del producto
  @Output() categoriesChange = new EventEmitter<Category[]>();

  // Referencia al elemento input del formulario
  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

  constructor(private categoriesService: CategoriesService) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // Llamada al servicio para petición al API del listado de todas las categorías
    this.categoriesService.getCategories().subscribe(
      categories => {

        // Inicializa el listado de todas las categories
        this.allCategories = categories;

        // Suscripción a los cambios en el formulario para generar el listado de categorías filtradas
        this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
          startWith(null),

          // Filtra las categorías si coinciden con lo escrito en el formulario
          map(
            (category: string | Category | null) => category ? this._filter(typeof(category) === 'string' ? category : category.name) : this.allCategories.slice(),
          )
        );
      }
    )
  }

  /**
   * Método que elimina una categoría de un producto
   * @param {Category} category - Categoría a eliminar
   */
  remove(category: Category) {

    // Obtiene el indice de la categoría del listado
    const index = this.categories.indexOf(category);
    if (index >= 0) {

      // Elimina la categoría del listado
      this.categories.splice(index, 1);

      // Emite un evento con el nuevo listado de categorías del producto
      this.categoriesChange.emit(this.categories);
    }
  }

  /**
   * Metodo que se ejecuta cuando una de las opciones de categoría se selecciona
   * @param {MatAutocompleteSelectedEvent} event - Evento generado 
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    // Verifica que la categoría seleccionada no pertenezca ya al producto y que la categoría seleccionada esté en el listado de todas las categorías
    if(!this.categories.map(category => category.name).includes(event.option.viewValue) 
        && this.allCategories.map(category => category.name).includes(event.option.viewValue)) {

      // Agrega la categoría a las categorías del producto
      this.categories.push(event.option.value);

      // Emite un evento con el nuevo listado de categorías del producto
      this.categoriesChange.emit(this.categories);
    }
    // Establece el valor del elemento input como una cadena de texto vacía
    this.categoryInput.nativeElement.value = '';

    // Establece el valor del formulario como null
    this.categoryCtrl.setValue(null);
  }

  /**
   * Filtro de categorías para el formulario
   * @param {string} value - Cadena de texto a comparar
   * @returns 
   */
  private _filter(value: string): Category[] {
    const filterValue = value.toLowerCase();

    // Verifica, para todas las categorías, cuales contienen el texto a comparar
    return this.allCategories.filter(category => category.name.toLowerCase().includes(filterValue));
  }
}
