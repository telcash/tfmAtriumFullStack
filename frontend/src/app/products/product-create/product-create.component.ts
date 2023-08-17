import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  productCreateForm = new FormGroup({
    'name': new FormControl(''),
    'description': new FormControl(''),
    'price': new FormControl(''),
    'stock': new FormControl(''),
    'availability': new FormControl(''),
    'image': new FormControl(null),
  });

  file: File | null = null;

  constructor(
    private productsService: ProductsService,
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
    this.productsService.createProduct(formData).subscribe(
      () => {
        this.goToProducts();
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
