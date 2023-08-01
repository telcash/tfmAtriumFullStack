import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductsService } from './products.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductGalleryComponent
  ],
  providers: [
    ProductsService,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
  ],
  exports: [
    ProductGalleryComponent,
  ]
})
export class ProductsModule { }
