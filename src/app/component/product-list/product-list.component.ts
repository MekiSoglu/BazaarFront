import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../cammon/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
    //templateUrl: './product-list-table.component.html',
    templateUrl: './product-list-grid.component.html',

  //templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products:Product[]=[];
  currentCategoryId : number=0;
  constructor(private productService:ProductService,private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
          this.listProducts();

    })
  }

private listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
    const categoryId = +this.route.snapshot.paramMap.get('id')!;
        if (!isNaN(categoryId)) { // Check if categoryId is a valid number
                this.currentCategoryId = categoryId;
                console.log("id:"+this.currentCategoryId)
             this.productService.getProductList(this.currentCategoryId).subscribe(
               data => {
                  this.products = data;
                  console.log("data:"+data)
               })
        }

    } else {
      this.productService.getAllProductList().subscribe(
        data => {
          this.products = data;
        }
      )
    }
  }
}
