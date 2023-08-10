import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';

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

  constructor(private productsService: ProductsService) {}

  onSubmit() {
    const formData: FormData = new FormData();
    console.log(this.productCreateForm.value.availability);
    console.log(this.productCreateForm.controls.availability.value);
    formData.append('name', this.productCreateForm.value.name ?? '');
    formData.append('description', this.productCreateForm.value.description ?? '');
    formData.append('price', this.productCreateForm.value.price ?? '0');
    formData.append('stock', this.productCreateForm.value.stock ?? '0');
    formData.append('availability', this.productCreateForm.value.availability ?? 'STOCK');
    if (this.file) {
      formData.append('file', this.file);
    }

    this.productsService.createProduct(formData).subscribe();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    //if (this.file) {
      //this.fileName = this.file.name;
      /* const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.http.post("/api/thumbnail-upload", formData);
      upload$.subscribe(); */
    //}
  }
}
