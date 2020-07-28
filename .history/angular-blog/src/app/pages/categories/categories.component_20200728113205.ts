import { Component, OnInit, HostListener } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];
  public totalCategories: number = 0;
  public newCategory: Category;

  public currentPage = 1;
  public totalPages: number = 0;

  constructor(private _categoryService: CategoryService) {
    this.newCategory = new Category(0, '', 0);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories() {
    this._categoryService.getCategories(this.currentPage).subscribe(
      (response) => {
        console.log(response);
        this.totalPages = response.categories.last_page;
        this.totalCategories = response.categories.total;
        
        if(this.currentPage <= this.totalPages){
          this.categories = this.categories.concat(response.categories.data);
          this.currentPage++;
        }
      },
      (error) => console.error(error)
    );
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.getCategories();
    }
  }

  public createCategory() {
    this._categoryService.create(this.newCategory.name).subscribe(
      (response) => {
        console.log(response);
        this.categories = response.categories;
        this.newCategory = new Category(0, '');
      },
      (error) => console.error(error)
    );
  }

  public removeCategory(id: number) {
    this._categoryService.remove(id).subscribe(
      (response) => {
        console.log(response);
        this.categories = response.categories;
      },
      (error) => console.error(error)
    );
  }

  public updateCategory(modifiedCategory: Category) {
    console.log(modifiedCategory);
    this._categoryService.update(modifiedCategory).subscribe(
      (response) => {
        console.log(response);
        this.categories[
          this.categories.map((cat) => cat.id).indexOf(response.category.id)
        ] = response.category;
      },
      (error) => console.error(error)
    );
  }

  public compare(a: Category, b: Category) {
    let nameA = a.name;
    let nameB = b.name;

    let comparison = 0;
    if (nameA > nameB) comparison = 1;
    else if (nameA < nameB) comparison = -1;
    return comparison;
  }
}
