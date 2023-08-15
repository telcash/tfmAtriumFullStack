import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/config/global-constants';

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
  file: File | null = null;
  imgUrl: string = GlobalConstants.API_STATIC_PRODUCTS_IMG;

  constructor(
    private productsService: ProductsService,
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
