import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';
import { concat, concatMap, map } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';

export interface CategoryTab {
  label: string;
  content: Product[];
}

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})

export class ProductGalleryComponent implements OnInit {

  tabs: CategoryTab[] = [];
  labels: string[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    let index = 0;
    this.categoriesService.getCategories().pipe(
      concatMap((categories) => {
        categories.map(category => this.labels.push(category.name));
        const products = categories.map(category => this.productsService.getProductsByCategory(category.id));
        return concat(...products);
      }),
      map((productsByCategory) => {
        return productsByCategory.filter((product) => {
          return product.name && product.description && product.price && product.stock && product.availability && product.image
        })
      })).subscribe(productsByCategory => {
        if(productsByCategory.length > 0) {
          const tab: CategoryTab = {
            label: this.labels[index],
            content: productsByCategory,
          }
          this.tabs.push(tab);
        }
        index++;
    })

  }
}
