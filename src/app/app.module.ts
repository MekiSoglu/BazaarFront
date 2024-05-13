import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {NgOptimizedImage} from "@angular/common";
import { CategoryListComponent } from './component/category-list/category-list.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  { path: 'products/category/:id', component: ProductListComponent },
  { path: 'products/category', component: ProductListComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: "/products", pathMatch: "full" },
  { path: 'products**', redirectTo: "/products", pathMatch: "full" }
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent
  ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgOptimizedImage
    ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
