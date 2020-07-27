import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {Category} from 'src/app/models/category.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[] = [];
  public newCategory: Category;
  constructor(
    private _categoryService: CategoryService
  ) {
    this.newCategory = new Category(0, "");
   }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(
      response => {
        console.log(response);
        this.categories = response.categories;
      },
      error => console.error(error)
    );
  }

  public createCategory(){
    this._categoryService.create(this.newCategory.name).subscribe(
      (response) => {},
      (error) => console.error(error)
    );
  }

}
