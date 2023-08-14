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
import { ProductsTableComponent } from './products-table/products-table.component'
import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductGalleryComponent,
    ProductCreateComponent,
    ProductsTableComponent
  ],
  providers: [
    ProductsService,
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
  ],
  exports: [
    ProductGalleryComponent,
    ProductCreateComponent,
    ProductsTableComponent,
  ]
})
export class ProductsModule { }
