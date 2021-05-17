import { Component, Input, OnInit } from '@angular/core';
import { Address } from './address';
import { GardenService } from '../garden.service';
import { Product } from '../shopping/product';
import { Card } from './card';
import { CardCreate } from './cardCreate';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { PurchaseOrder } from './purchaseOrder';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private gardenService: GardenService, public datepipe: DatePipe) {  }

  streetNum = '';
  streetName = '';
  city = '';
  state = '';
  zip = '';

  cardType = '';
  cardNum = '';
  nameOnCard = '';
  exDate! : Date;
  cvv = 0;
  cardBalance = 1500.00;

  todayDate = new Date();

  errorMessage = '';
  address!: Address;

  @Input() prodArr: any;
  @Input() qtyArr: any;
  @Input() calcObj: any;
  card!: Card;
  cardCreate!: CardCreate;
  
  path = "http://localhost:5000/images/";

  purchaseOrderId = 0;

  ngOnInit(): void {
  
  }

  addAddress() {
    this.gardenService.createAddress({'addressStreetNumber': this.streetNum, 'addressStreetName': this.streetName, 'addressCity': this.city, 'addressState': this.state, 'addressZipCode': this.zip})
      .subscribe(
        add => {
          this.address = add;
          console.log("add, the returned data from service inside shoppCartComp before assigning to prop: " + add);
          console.log("this.address prop in ShoppingCartComp: " + this.address);
        },
        error => this.errorMessage = <any>error
      );
  }

  addPayment() {
    //let newExDate = this.datepipe.transform(this.exDate, 'yyyy-MM-dd');
    //let newExDate = this.exDate.toISOString().slice(0,10);
    console.log(this.cardType + ' ' + this.cardNum + ' ' + this.nameOnCard + ' ' + this.exDate + ' ' + this.cvv + ' ' + this.cardBalance);
    this.gardenService.createCard({'cardType': this.cardType, 'cardNumber': this.cardNum, 'nameOnCard': this.nameOnCard, 'cardExDate': this.exDate, 'cardCVV': this.cvv, 'cardBalance': this.cardBalance})
      .subscribe(
        card => {
          this.card = card;
          console.log(card);
          console.log(this.card);
        },
        error => this.errorMessage = <any>error
      );
  }

  // createItems(purchOrderId: number) {

  // }

  placeOrder() {
    this.gardenService.createPurchaseOrder({'PurchaseOrderTotalAmount': this.calcObj.totalWith, 'AddressId': this.address.addressId, 'CardId': 2})
      .subscribe(
        purchOrderId => {
          this.purchaseOrderId = purchOrderId;
          console.log(purchOrderId);
          console.log(this.purchaseOrderId);
        },
        error => this.errorMessage = <any>error
      );
  }
}

//     CardType!: string;
//     CardNumber!: string;
//     NameOnCard!: string;
//     CardExDate!: Date;
//     CardCVV!: number;
//     CardBalance!: number;
