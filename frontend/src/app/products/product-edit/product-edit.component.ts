import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/config/global-constants';
import { Category } from 'src/app/categories/models/category';
import { Observable, concat } from 'rxjs';
import { ProductCategory } from '../models/product-category';
import { ProductCategoriesService } from '../product-categories.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productEditForm = new FormGroup({
    'name': new FormControl(''),
    'description': new FormControl(''),
    'price': new FormControl(''),
    'stock': new FormControl(''),
    'availability': new FormControl(''),
    'image': new FormControl(''),
  });

  product!: Product;
  categories: Category[] = [];
  file: File | null = null;
  imgUrl: string = GlobalConstants.API_STATIC_PRODUCTS_IMG;

  constructor(
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadInitialValues();
  }
  
  loadInitialValues() {
    const productId = this.route.snapshot.params['id'];
    this.productsService.getProduct(productId).subscribe(
      (data) => {
        this.product = data;
        this.categories = [...this.product.categories];
        this.setFormValues(this.product);
        this.productEditForm.markAsPristine();
      }
    )
  }

  onSubmit() {
    const productId = this.route.snapshot.params['id'];
    const formData: FormData = new FormData();
    Object.keys(this.productEditForm.controls).forEach(key => {
      const value = this.productEditForm.get(key)?.value;
      if(value && typeof value === 'string' ) {
        formData.append(key, value);
      }
    })

    if (this.file) {
      formData.append('file', this.file);
    }

    const obs: Observable<ProductCategory>[] = [];

    for(const category of this.product.categories) {
      if(this.categories.map(category => category.id).includes(category.id)) {
        this.categories.splice(this.categories.indexOf(category), 1)
      } else {
        obs.push(this.productCategoriesService.removeCategoryOfProduct({productId: this.product.id, categoryId: category.id}))
      }
    }

    for(const category of this.categories) {
      obs.push(this.productCategoriesService.addCategoryToProduct({productId: this.product.id, categoryId: category.id}))
    }

    concat(...obs).subscribe();
      
    this.productsService.updateProduct(productId, formData).subscribe(
      () => {
        this.router.navigateByUrl('/admin/products');
      }
    );
  }

  setFormValues(product: Product) {
    this.productEditForm.setValue({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      availability: product.availability,
      image: product.image,
    })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  updateImage() {
    this.product.image = '';
    this.productEditForm.markAsDirty();
  }

}
