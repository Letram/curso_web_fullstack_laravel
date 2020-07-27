import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.scss']
})
export class CategoryEntryComponent implements OnInit {

  @Input('category')
  set category(value: Category){
    this.newCategory = value;
    this.currentCategory = value
  }
  get category(){
    return this.currentCategory;
  }

  @Output() onRemoveClicked: EventEmitter<number> = new EventEmitter();

  public editing: boolean;
  private newCategory: Category;
  private currentCategory: Category;
  constructor(private _categoryService: CategoryService) {
    this.editing=false;
    this.newCategory = new Category(0, "");
   }

  ngOnInit(): void {  }

  public removeCategory(){
    this.onRemoveClicked.emit(this.category.id);
  }

  public updateCategory(){
    this.editing = !this.editing;
  }
}
