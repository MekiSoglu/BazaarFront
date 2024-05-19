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
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElement:number=0;
  previousCategoryId:number=1;



  constructor(private productService:ProductService,private route:ActivatedRoute) {
  }
ngOnInit(): void {
  this.listProducts();
}

 listProducts(){
    this.route.paramMap.subscribe(() => {
    if (this.route.snapshot.paramMap.has('keyword')) {
      this.handleSearchProduct();
    } else {
      this.handleListOrGetAllProducts();
    }
  });
}

checkPage(page:number){
      this.thePageNumber=page;
      this.listProducts();
}
changePageSize(size:string){
    this.thePageSize = +size;
    this.thePageNumber=1;
    this.listProducts();

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
  }

   if (this.previousCategoryId !== this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId ${this.currentCategoryId}, thePageNumber ${this.thePageNumber}, thepagesize   theTotalElement ${this.theTotalElement}`);

    this.productService.getProductListPagination(this.thePageNumber, this.thePageSize, this.currentCategoryId).subscribe(data => {
      this.products = data.content;
      this.thePageNumber = data.pageable.pageNumber;
      this.thePageSize = data.pageable.pageSize;
      this.theTotalElement = data.totalElements;
    });
}
private getAllProducts() {
      if(this.thePageNumber==0){
      this.thePageNumber=1;
    }
  this.productService.getAllProductList(this.thePageNumber,this.thePageSize).subscribe(
    data => {
       this.products=data.content;
        this.thePageNumber=data.pageable.pageNumber;
        this.thePageSize=data.pageable.pageSize;
        this.theTotalElement=data.totalElements;
    }
  );
}

  private handleSearchProduct() {

    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;
    if(this.thePageNumber==0){
      this.thePageNumber=1;
    }
    this.productService.searchProducts(this.thePageNumber,this.thePageSize,theKeyword).subscribe(
      data=>{
        this.products=data.content;
        this.thePageNumber=data.pageable.pageNumber;
        this.thePageSize=data.pageable.pageSize;
        this.theTotalElement=data.totalElements;

      }
    )
  }
}
