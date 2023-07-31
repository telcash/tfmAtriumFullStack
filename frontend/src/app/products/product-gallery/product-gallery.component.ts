import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category } from '../models/category';
import { Product } from '../models/product';

export interface CategoriesTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent {

  categories!: Category[];


  constructor(
    private productsService: ProductsService
  ) {

    this.productsService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        for(const category of this.categories) {
          this.productsService.getProductsByCategory(category.id).subscribe(
            (data: Product[]) => {
              category.products = data;
            }
          )
        }
      }
    )
  }
}
