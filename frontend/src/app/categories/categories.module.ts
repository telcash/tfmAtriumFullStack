import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from './categories.service';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { AppRoutingModule } from '../app-routing.module';


/**
 * Modulo encargado de las funciones de categorías de productos
 */
@NgModule({
  declarations: [
    CategoriesTableComponent,
    CategoryCreateComponent,
    CategoryEditComponent
  ],
  providers: [
    CategoriesService,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ]
})
export class CategoriesModule { }
