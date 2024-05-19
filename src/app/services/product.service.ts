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

getAllProductList(thePage: number, thePageSize: number): Observable<GetResponseProducts> {
      const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);
}

getProductListId(productId:number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/${productId}`;
  return this.httpClient.get<Product>(searchUrl);
}
getProductListPagination(thePage: number, thePageSize: number, categoryId: number): Observable<GetResponseProducts> {
    console.log("service"+thePageSize)
  const searchUrl = `${this.baseUrl}/category/${categoryId}?page=${thePage}&size=${thePageSize}`;
  return this.httpClient.get<GetResponseProducts>(searchUrl);
}


 getDetailsById(id: number): Observable<Map<string, string>> {
    const url = `${this.baseUrl}/show/${id}`;
    return this.httpClient.get<Map<string, string>>(url);
  }

  searchProducts(thePage: number, thePageSize: number,theKeyword: string):Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/${theKeyword}?page=${thePage}&size=${thePageSize}`;
  return this.httpClient.get<GetResponseProducts>(searchUrl)

  }

}

interface GetResponseProducts {
  content: Product[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: false;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

