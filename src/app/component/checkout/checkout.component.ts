import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../cammon/country";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;
  totalPrice:number=0;
  totalQuantity:number=0;
  creditCardMonth:number[]=[];
  creditCardYear:number[]=[];
  countries:Country[]=[];

  constructor(private formBuilder:FormBuilder,private shopService:ShopFormService) {
  }

  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        customer:this.formBuilder.group({
           street:[''],
           city:[''],
           state:[''],
           country:[''],
           zipCode:['']
        })
      }),
      billingAddress: this.formBuilder.group({
        customer:this.formBuilder.group({
           street:[''],
           city:[''],
           state:[''],
           country:[''],
           zipCode:['']
        })
      }),
      creditCard: this.formBuilder.group({
        customer:this.formBuilder.group({
           cartType:[''],
           nameOnCard:[''],
           cardNumber:[''],
           securityCode:[''],
           expirationMonth:[''],
          expirationYear:['']
        })
      })
    })

    //populate credit card month
    const startMonth:number=new Date().getMonth()+1;
    this.shopService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        this.creditCardMonth=data;
      }
    )

    //populate credit card year
    this.shopService.getCreditCardYears().subscribe(
      data=>{
        this.creditCardYear=data;
      }
    )

      //populate countries

    this.shopService.getCountries().subscribe(
      data=>{
        this.countries=data;
      }
    )
  }




  onSubmit(){
    console.log("clic hadnle button")
    console.log(this.checkoutFormGroup.get('customer')?.value)
  }

  copyShippingAddressToBillingAddress($event: Event) {
    // @ts-ignore
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYear(){
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
    const currentYear:number=new Date().getFullYear();
    const selectedYear:number=Number(creditCardFormGroup?.value.expirationYear)

    let startMonth:number;
    if(currentYear===selectedYear){
      startMonth=new Date().getMonth()+1
    }else{
      startMonth=1;
    }

    this.shopService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        this.creditCardMonth=data;
      }
    )
  }


}
