import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductsService } from './products.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCreateComponent } from './product-create/product-create.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsTableComponent } from './products-table/products-table.component';
import { MatTableModule } from '@angular/material/table';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';

import { MatChipsModule } from '@angular/material/chips'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ProductCategoriesService } from './product-categories.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductGalleryComponent,
    ProductCreateComponent,
    ProductsTableComponent,
    ProductEditComponent,
    ProductCategoriesComponent,
  ],
  providers: [
    ProductsService,
    ProductCategoriesService,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatChipsModule,
    MatAutocompleteModule,    
  ],
  exports: [
    ProductGalleryComponent,
    ProductCreateComponent,
    ProductsTableComponent,
  ]
})
export class ProductsModule { }
