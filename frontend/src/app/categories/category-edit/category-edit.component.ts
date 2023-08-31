import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  // Definición del formulario de edición de una categoría
  categoryEditForm = new FormGroup({
    'name': new FormControl('',{nonNullable: true, validators:[
      Validators.required,
    ]})
  });

  category!: Category;

  // Obtiene el id de la categoría del parámetro de la url
  categoryId = this.route.snapshot.params['id'];

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // LLamada al servicio para solicitud al API de la categoría correspondiente al id
    this.categoriesService.getCategory(this.categoryId).subscribe(
      data => {

        // Inicializa el atributo category
        this.category = data;

        // Inicializa el formulario
        this.categoryEditForm.patchValue(this.category);
      }
    )
  }

  /**
   * Envía el formulario de edición de categoría
   */
  onSubmit() {

    if(this.categoryEditForm.valid) {
      
      // LLamada al servicio para petición al API de actualización de categoría
      this.categoriesService.editCategory(this.categoryId, this.categoryEditForm.getRawValue()).subscribe(
  
        // Una vez editada navega al listado de categorías
        () => this.router.navigateByUrl('admin/categories'),
      )
    }
  }
}
