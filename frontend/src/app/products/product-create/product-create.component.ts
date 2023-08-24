import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ProductCategory } from '../models/product-category';
import { Category } from 'src/app/categories/models/category';
import { Observable, concat } from 'rxjs';
import { ProductCategoriesService } from '../product-categories.service';
import { Product } from '../models/product';
import Validation from 'src/app/shared/validation';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  valid: Validation = new Validation()

  productCreateForm = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    'description': new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(190),
    ]),
    'price': new FormControl<number>(0, [
      Validators.min(0),
      this.valid.numberValidator,
    ]),
    'stock': new FormControl<number>(0, [
      Validators.min(0),
      this.valid.numberValidator,
    ]),
    'availability': new FormControl(''),
    'image': new FormControl(null),
  });

  categories: Category[] = [];
  file: File | null = null;

  constructor(
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private router: Router,
  ) {}

  onSubmit() {
    const formData: FormData = new FormData();
    Object.keys(this.productCreateForm.controls).forEach(key => {
      const value = this.productCreateForm.get(key)?.value;
      if(value && typeof value === 'string' ) {
        formData.append(key, value);
      }
    })

    if (this.file) {
      formData.append('file', this.file);
    }

    const obs: Observable<ProductCategory>[] = [];

    this.productsService.createProduct(formData).subscribe(
      (data: Product) => {
        for(const category of this.categories) {
          obs.push(this.productCategoriesService.addCategoryToProduct(
            {
              productId: data.id,
              categoryId: category.id,
            }
          ))
        }
        if(obs.length > 0) {
          concat(...obs).subscribe(
            () => {
              this.goToProducts();
            }
          )
        } else {
          this.goToProducts();
        }
      }
    );
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  goToProducts() {
    this.router.navigateByUrl('admin/products');
  }
}
