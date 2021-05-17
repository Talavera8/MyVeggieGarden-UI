import { Component, OnInit } from '@angular/core';
import { AbstractExtendedWebDriver } from 'protractor/built/browser';
import { GardenService } from '../garden.service';
import { Product } from './product';
import { LogService } from '../log.service';
import { noUndefined } from '@angular/compiler/src/util';
import { TmplAstTextAttribute } from '@angular/compiler';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  constructor(private gardenService: GardenService, private logger: LogService) { }

  products!: Product[];
  path = "http://localhost:5000/images/";
  fontWeight = 'bold';
  fontSize = '20px';
  hidden = false;
  purchProdIds = new Array();
  purchProds = new Array();
  purchQtys = new Array();
  badgeQty = 0;

  calculations: any;
  totalWithout = 0;
  totalWith = 0;
  taxes = 0;
  numberItems = 0;

  showShop = true;
  showCart = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.gardenService.getProducts().subscribe(
      products => this.products = products
    );
  }

  goToCart() {

    this.calculate();
    this.showShop = false;
    this.showCart = true;
  }

  calculate() {
    this.purchProds.forEach((p, i,) => {
      this.totalWithout += this.purchQtys[i] * p.productUnitPrice;
      this.numberItems += this.purchQtys[i];
    }); 
    this.calculateTaxes();
  }

  calculateTaxes() {
    var taxRate = .06;
    this.totalWith = this.totalWithout * (1 + taxRate);
    this.taxes = this.totalWithout * taxRate;
    this.calculations = { 'totalWithout': this.totalWithout, 'totalWith': this.totalWith, 'taxes': this.taxes, 'numberItems': this.numberItems };
  }

  addQuantity(p: Product) {
    var addDiv = document.getElementById('itemAdd-' + p.productId.toString());
    var addQty = document.getElementById('qtyAdd-' + p.productId.toString());

    if (addDiv != null && addDiv.style.display != 'none') {
      // hide addItemToCart button and show addQtyButton instead
      addDiv.style.display = 'none';
      // add 1 to badgeQty and reflect it on the sessionStorage
      this.badgeQty += 1;

      if (this.badgeQty > 0) {
        sessionStorage.removeItem('items');
        sessionStorage.setItem('items', this.badgeQty.toString());
      }

      console.log('badge: ' + this.badgeQty);
      console.log('sessionStorage: ' + sessionStorage.getItem('items'));

      // add prod and first quantity in arrays
      this.purchProdIds.push(p.productId);
      this.purchProds.push(p);
      this.purchQtys.push(1);

      //Print values of arrays for debugging purposes
      this.purchProdIds.forEach(id => console.log('prod: ' + id));
      this.purchProds.forEach(p => console.log('prod: ' + p.productName));
      this.purchQtys.forEach(qty => console.log('qty: ' + qty));

      // hide the add to card button
      if (addQty != null) {
        addQty.style.display = 'block';
      }

    }
  }

  increaseQty(p: Product) {
    var newQty = 0;
    // Get current quantity for this product
    var el = document.getElementById('qtyCount-' + p.productId);
    var count = document.getElementById('qtyCount-' + p.productId)?.innerText;

    if (count != null && parseInt(count) < 3) {
      // newQty = 0;
      // Add 1 to badgeQty every time an item's qty is increased and reflect qty in cart in sessionStorage
      this.badgeQty += 1;
      if (this.badgeQty > 0) {
        sessionStorage.removeItem('items');
        sessionStorage.setItem('items', this.badgeQty.toString());
      }

      console.log('badge: ' + this.badgeQty);
      console.log('sessionStorage: ' + sessionStorage.getItem('items'));

      // Increase qty by 1 if qty is not over the limit of 3
      newQty = parseInt(count) + 1;

      // Post the new count in button // get rid of newQty and make innerTex = this.badgeQty.toString();
      if (el != null) el.innerText = newQty.toString();

      // Update this product's quantity in the array
      var idx = this.purchProdIds.findIndex(e => e === p.productId);
      var ind = this.purchProds.findIndex(e => e.productId === p.productId);
      console.log(ind);
      this.purchQtys[ind] = newQty; // made this equal to = this.badgeQty;

      //Print values of arrays for debugging purposes
      this.purchProdIds.forEach(id => console.log('prod: ' + id));
      this.purchProds.forEach(p => console.log('prod: ' + p.productName));
      this.purchQtys.forEach(qty => console.log('qty: ' + qty));
    }
    else {
      // Show div with error message if user tries to buy more than limit of 3 of the same product
      var errDiv = document.getElementById('limit-' + p.productId);
      if (errDiv != null) errDiv.innerText = 'limit 3 per order';
    }
  }

  decreaseQty(p: Product) {
    // Get the button elements to change display value according to qty of product
    var addDiv = document.getElementById('itemAdd-' + p.productId.toString());
    var addQty = document.getElementById('qtyAdd-' + p.productId.toString());

    var newQty = 0;

    var el = document.getElementById('qtyCount-' + p.productId);
    var count = document.getElementById('qtyCount-' + p.productId)?.innerText;

    if (count != null && parseInt(count) > 0) {
      // Decrease badgeQty by one every time an item's quantity is decreased and reflect new qty in sessionStorage
      this.badgeQty -= 1;
      if (this.badgeQty > 0) {
        sessionStorage.removeItem('items');
        sessionStorage.setItem('items', this.badgeQty.toString());
      }

      console.log('badge: ' + this.badgeQty);
      console.log('sessionStorage: ' + sessionStorage.getItem('items'));

      // Decrease qty by 1 if qty is not 0
      newQty = parseInt(count) - 1;

      // Post the new count in button
      if (el != null) el.innerText = newQty.toString();

      // Update this product's quantity in the array if new qty is more than 0
      var idx = this.purchProdIds.findIndex(e => e === p.productId);
      var ind = this.purchProds.findIndex(e => e.productId === p.productId);
      console.log('found index: ' + ind);

      if (newQty > 0) {
        this.purchQtys[ind] = newQty;
      }

      // If new qty is 0, remove the prodId from the prodArr and the qty from the qtyArr
      // and display the add item button and hide the add qty button
      else {
        this.purchProdIds.splice(ind, 1);
        this.purchQtys.splice(ind, 1);
        this.purchProds.splice(ind, 1);
        if (addQty != null && addDiv != null) {
          addQty.style.display = 'none';
          addDiv.style.display = 'block';
        }
      }
    }
    //Print values of arrays for debugging purposes
    this.purchProdIds.forEach(id => console.log('prod: ' + id));
    this.purchProds.forEach(p => console.log(p.productName));
    this.purchQtys.forEach(qty => console.log('qty: ' + qty));
  }
}
