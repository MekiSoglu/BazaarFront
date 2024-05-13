import {Component, OnInit} from '@angular/core';
import {category} from "../../cammon/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  categories:category[]=[]
childCategoriesMap: Map<number, category[]> = new Map();


  constructor(private categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.listCategory();
  }


  private listCategory() {
    this.categoryService.getCategoryList().subscribe(
      data=>{
        this.categories=data;
                this.getChildCategories();

      }
    )
  }


  getChildCategories(): void {
    for (let category of this.categories) {
      if (!category.parent_id) {
        let children: category[] = [];
        for (let child of this.categories) {
          if (category.id == child.parent_id) {
            children.push(child);
          }
        }
        this.childCategoriesMap.set(category.id, children);
      }
    }
  }


}
