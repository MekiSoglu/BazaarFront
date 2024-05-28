import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../cammon/cart-item";
import {CartService} from "../../services/cart.service";



@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number=0;
  totalQuantity:number=0;

  constructor(private cartService:CartService) {
  }
  ngOnInit(): void {

    this.listCartDetails();
  }


  private listCartDetails() {

    this.cartItems=this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(data=>{
      this.totalPrice=data;
    })

    this.cartService.totalPrice.subscribe(data=>{
      this.totalQuantity=data;
    })

    this.cartService.computeCartTotals();



  }


  incrementQuantity(theCartItem:CartItem){

    this.cartService.addToCard(theCartItem);

  }

  decrementQuanitity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem)

  }
}
