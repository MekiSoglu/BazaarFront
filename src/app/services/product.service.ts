import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../cammon/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:4444/products';


  constructor(private httpClient: HttpClient) { }

getProductList(): Observable<Product[]> {
  return this.httpClient.get<Product[]>(this.baseUrl);
}

}

interface GetResponse{
  _embedded:{
    products:Product[]
  }
}
