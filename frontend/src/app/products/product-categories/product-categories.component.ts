import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Category } from 'src/app/categories/models/category';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl('');
  filteredCategories!: Observable<Category[]>;
  allCategories: Category[] = [];

  @Input() categories!: Category[];
  @Output() categoriesChange = new EventEmitter<Category[]>();
  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.allCategories = data;
        this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
          startWith(null),
          map(
            (category: string | Category | null) => category ? this._filter(typeof(category) === 'string' ? category : category.name) : this.allCategories.slice(),
          )
        );
      }
    )
  }

  remove(category: Category): void {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories.splice(index, 1);
      this.categoriesChange.emit(this.categories);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.categories.map(category => category.name).includes(event.option.viewValue) && this.allCategories.map(category => category.name).includes(event.option.viewValue)) {
      this.categories.push(event.option.value);
      this.categoriesChange.emit(this.categories);
    }
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): Category[] {
    const filterValue = value.toLowerCase();
    return this.allCategories.filter(category => category.name.toLowerCase().includes(filterValue));
  }
}
