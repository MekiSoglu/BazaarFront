import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {of} from "rxjs"
import {HttpClient} from "@angular/common/http";
import {Country} from "../cammon/country";
import {State} from "../cammon/state";
@Injectable({
  providedIn: 'root'
})
export class ShopFormService {
  private countryUrl='http://localhost:4444/country';
    private statesUrl='http://localhost:4444/state';


  constructor(private httpClient:HttpClient) { }

  getCountries():Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countryUrl).pipe(
      map(response=>response._embedded.countries)
    )
  }

  getStates(theCountryCode:string):Observable<State[]>{
    const searchUrl=`${this.statesUrl}/code/${theCountryCode}`;
      return this.httpClient.get<GetResponseState>(this.statesUrl).pipe(
      map(response=>response._embedded.state)
    )
  }

  getCreditCardMonths(startMonth:number):Observable<number[]>{
      let data:number[]=[];
  for(let theMonth=startMonth;theMonth<=12;theMonth++){
    data.push(theMonth)
  }
  return of(data);
  }

  getCreditCardYears():Observable<number[]>{
    let data:number[]=[];
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    for(let theYear=startYear;theYear<=endYear;theYear++){
    data.push(startYear)
    }
    return of(data);

  }

}

interface GetResponseCountries{
  _embedded:{
    countries:Country[];
  }
}

interface GetResponseState{
  _embedded:{
    state:State[];
  }
}
