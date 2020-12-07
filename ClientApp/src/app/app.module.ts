import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartEditComponent } from './cart-edit/cart-edit.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
	AppComponent,
	CartListComponent,
	AddCartComponent,
	CartDetailsComponent,
	CartEditComponent,
	TopBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
	HttpClientModule,
	ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
		{ path: '', component: CartListComponent },
		{ path: 'addCart', component: AddCartComponent },
		{ path: 'carts/:cartId', component: CartDetailsComponent },
		{ path: 'carts/edit/:cartId', component: CartEditComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
