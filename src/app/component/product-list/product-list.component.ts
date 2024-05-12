import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../cammon/product";

@Component({
  selector: 'app-product-list',
    //templateUrl: './product-list-table.component.html',
    templateUrl: './product-list-grid.component.html',

  //templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products:Product[]=[];
  constructor(private productService:ProductService) {
  }
  ngOnInit(): void {
    this.listProducts();
  }

  private listProducts() {
    this.productService.getProductList().subscribe(
      data=>{
        this.products=data;
      }
    )
  }
}
