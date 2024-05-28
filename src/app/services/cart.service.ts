import { Injectable } from '@angular/core';
import {CartItem} from "../cammon/cart-item";
import {Subject} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem:CartItem[] = [];
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>()
  constructor() { }

  addToCard(theCartItem:CartItem){
    let alreadyExistsInCard:boolean=false;
    let existingCartItem: CartItem | undefined = undefined;

    if(this.cartItem.length>0){

      existingCartItem=this.cartItem.find(tempCartItem=>tempCartItem.id===theCartItem.id);

      if(existingCartItem!=undefined){
        alreadyExistsInCard=true;
      }
    }
    if(alreadyExistsInCard){
      existingCartItem!.quantity++;
    }else{
      this.cartItem.push(theCartItem)
    }

    this.computeCartTotals();

  }

  public computeCartTotals() {
    let totalPriceValue:number=0;

    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItem){
      totalPriceValue +=currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCardData(totalPriceValue,totalQuantityValue);
  }

  private logCardData(totalPriceValue: number, totalQuantityValue: number) {

    for(let tempCardItem of this.cartItem){
      const subTotal=tempCardItem.unitPrice*tempCardItem.quantity;
      console.log("name"+tempCardItem.name+"quantity"+tempCardItem.quantity+"totalPrice"+subTotal)
    }

  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if(theCartItem.quantity===0){
     this.remove(theCartItem);
    }else{
      this.computeCartTotals()
    }

  }


  private remove(theCartItem: CartItem) {
    const itemIndex=this.cartItem.findIndex(tempCartItem=>
    tempCartItem.id===theCartItem.id
    )
    if(itemIndex>-1){
      this.cartItem.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}
