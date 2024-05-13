import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../cammon/product";
import {category} from "../cammon/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl='http://localhost:4444/category';


  constructor(private httpClient: HttpClient) { }

getCategoryList(): Observable<category[]> {
  return this.httpClient.get<category[]>(this.baseUrl);
}

}

interface GetResponse{
  _embedded:{
    products:category[]
  }
}
