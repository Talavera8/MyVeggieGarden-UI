import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'shoppingcart', component: ShoppingCartComponent },
  { path: 'orderconfirmation', component: OrderConfirmationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
