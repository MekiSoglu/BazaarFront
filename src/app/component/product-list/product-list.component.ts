import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../cammon/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
    templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products:Product[]=[];
  currentCategoryId : number=0;
  searchMode:boolean=false;

  constructor(private productService:ProductService,private route:ActivatedRoute) {
  }
ngOnInit(): void {
  this.route.paramMap.subscribe(() => {
    if (this.route.snapshot.paramMap.has('keyword')) {
      this.handleSearchProduct();
    } else {
      this.handleListOrGetAllProducts();
    }
  });
}


private handleListOrGetAllProducts() {
  if (this.route.snapshot.paramMap.has('id')) {
    this.handleListProduct();
  } else {
    this.getAllProducts();
  }
}


private handleListProduct() {
  const categoryId = +this.route.snapshot.paramMap.get('id')!;
  if (!isNaN(categoryId)) {
    this.currentCategoryId = categoryId;
    console.log("id:" + this.currentCategoryId);
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
        console.log("data:" + data);
      }
    );
  }
}
private getAllProducts() {
  this.productService.getAllProductList().subscribe(
    data => {
      this.products = data;
      console.log("getAll")
    }
  );
}


  private handleSearchProduct() {

    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products=data;
            console.log(data)
      }
    )
  }
}
