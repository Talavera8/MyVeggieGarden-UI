import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserLogin } from './login/userLogin';
import { ApplicationUser } from './login/applicationUser';
import { UserCreate } from './create-account/userCreate';
import { Product } from './shopping/product';
import { Address } from './shopping-cart/address';
import { AddressCreate } from './shopping-cart/addressCreate';
import { Card } from './shopping-cart/card';
import { CardCreate } from './shopping-cart/cardCreate';
import { PurchaseOrderCreate } from './shopping-cart/purchaseOrderCreate';
import { PurchaseOrder } from './shopping-cart/purchaseOrder';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(private http: HttpClient) { }

  logIn(userLogin: UserLogin): Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>("http://localhost:5000/api/Account/Login", userLogin).pipe(
      tap(data=>console.log('User logged in: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:5000/api/Product/GetAllProducts").pipe(
      tap(data => console.log("Products retrieved")) 
    );
  }

  createAccount(userCreate: UserCreate): Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>("http://localhost:5000/api/Account/Register", userCreate).pipe(
      tap(data=>console.log('Account created')),
      catchError(this.handleError)
    );
  }

  createAddress(addressCreate: AddressCreate): Observable<Address> {
    return this.http.post<Address>("http://localhost:5000/api/Address/Create", addressCreate).pipe(
      tap(data=>
        {
          console.log('Address created');
          console.log(data);
        }),
      catchError(this.handleError)
    );
  }

  createCard(cardCreate: CardCreate): Observable<Card> {
    return this.http.post<Card>("http://localhost:5000/api/Card/Create", cardCreate).pipe(
      tap(data=>
        {
          console.log('Card created');
          console.log('data received from backend in service: ' + data);
        }),
      catchError(this.handleError)
    );
  }

  createPurchaseOrder(purchaseOrderCreate: PurchaseOrderCreate): Observable<number> {
    return this.http.post<number>("http://localhost:5000/api/PurchaseOrder/Create", purchaseOrderCreate).pipe(
      tap(data=>
        {
          console.log("Purchase Order created");
          console.log(data);
        }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg: string = '';
    if(err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
