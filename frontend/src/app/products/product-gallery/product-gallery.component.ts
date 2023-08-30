import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';
import { concat, concatMap, map, tap } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';

export interface CategoryTab {
  label: string;
  content?: Product[];
}

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})

export class ProductGalleryComponent implements OnInit {

  tabs: CategoryTab[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(
      tap(
        categories => categories.forEach(category => this.tabs.push({ label: category.name }))
      ),
      map(
        categories => categories.map(category => this.productsService.getProductsByCategory(category.id))
      ),
      concatMap(
        contents => concat(...contents)
      ),
    ).subscribe(
      products => this.tabs[this.tabs.findIndex(tab => !tab.content)].content = products
    )

  }

  setCartItemQuantity(product: Product){
    this.tabs.forEach(tab => {
      if(tab.content) {
        const index = tab.content.findIndex(e => e.id === product.id);
        if(index >= 0) {
          tab.content.splice(index, 1, product)
        }
      }
    })
  }
}
