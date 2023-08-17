import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  categoryCreateForm = new FormGroup({
    'name': new FormControl('')
  });

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
  ) {}

  onSubmit() {
    this.categoriesService.createCategory(this.categoryCreateForm.value).subscribe(
      () => {
        this.goToCategories();
      }
    );
  }

  goToCategories() {
    this.router.navigateByUrl('admin/categories');
  }
}
