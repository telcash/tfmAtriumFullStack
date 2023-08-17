import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryEditForm = new FormGroup({
    'name': new FormControl('')
  });

  category!: Category;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadInitialValues();
  }

  onSubmit() {
    const categoryId = this.route.snapshot.params['id'];
    this.categoriesService.editCategory(categoryId, this.categoryEditForm.value).subscribe(
      () => {
        this.goToCategories();
      }
    )
  }

  loadInitialValues() {
    const categoryId = this.route.snapshot.params['id'];
    this.categoriesService.getCategory(categoryId).subscribe(
      (data) => {
        this.category = data;
        this.setFormValues(this.category);
      }
    )
  }

  setFormValues(category: Category) {
    this.categoryEditForm.setValue({
      name: category.name,
    })
  }

  goToCategories() {
    this.router.navigateByUrl('admin/categories')
  }

}
