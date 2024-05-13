import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../cammon/product";
import {category} from "../cammon/category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:4444/products';


  constructor(private httpClient: HttpClient) { }

getAllProductList(): Observable<Product[]> {
  return this.httpClient.get<Product[]>(this.baseUrl);
}

getProductList(categoryId: number): Observable<Product[]> {
  const searchUrl = `${this.baseUrl}/category/${categoryId}`;
  return this.httpClient.get<Product[]>(searchUrl).pipe(
    map((response: any) => response.content)
  );
}

  searchProducts(theKeyword: string) {
    const searchUrl = `${this.baseUrl}/search/${theKeyword}`;
  return this.httpClient.get<Product[]>(searchUrl).pipe(
    map((response: any) => response.content)
  );

  }
}

interface GetResponse{
  _embedded:{
    products:Product[]
  }
}
