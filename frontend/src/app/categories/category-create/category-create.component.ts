import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

/**
 * Componente que gestiona el formulario de creación de una categoría
 */
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  
  // Definició del formulario de creación de categoría
  categoryCreateForm = new FormGroup({
    'name': new FormControl<string>('', {nonNullable: true, validators: [
      Validators.required,
    ]})
  });

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
  ) {}

  /**
   * Envía el formulario de creación de categoría
   */
  onSubmit() {
    if(this.categoryCreateForm.valid) {

      // LLamada al servicio para solicitud al API de creación de categoría
      this.categoriesService.createCategory(this.categoryCreateForm.getRawValue()).subscribe(
  
        // Una vez creada, navega al listado de categorías
        () =>  this.router.navigateByUrl('admin/categories'),
      );
    }
  }

}
