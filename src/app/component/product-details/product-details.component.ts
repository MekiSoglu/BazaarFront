import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../cammon/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;

    productMap: Map<string, string> = new Map<string, string>();



  constructor(private router:ActivatedRoute,
              private productService:ProductService) {
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(()=>{
      this.handleProductDetails();

    })
  }

  private handleProductDetails() {
    const theProductId:number=+this.router.snapshot.paramMap.get('id')!;
    this.productService.getProductListId(theProductId).subscribe(
      data=>{
        this.product=data;

        this.getProductDetails(theProductId);
    })
  }


  getProductDetails(id:number): void {
    this.productService.getDetailsById(id).subscribe(
      data => {
        this.productMap = this.convertDataToMap(data);
        console.log(this.productMap);
      },
      error => {
        console.error(error);
      }
    );
  }

  private convertDataToMap(data: any): Map<string, string> {
    const map = new Map<string, string>();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        map.set(key, data[key]);
      }
    }
    return map;
  }


}
