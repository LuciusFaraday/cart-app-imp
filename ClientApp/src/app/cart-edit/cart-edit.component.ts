import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartValidatorService } from '../cart-validator.service';
import { Cart } from '../carts';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-cart-edit',
  templateUrl: './cart-edit.component.html',
  styleUrls: ['./cart-edit.component.css']
})
export class CartEditComponent implements OnInit {

  cart: Cart;
  editCartForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private cartsService: CartsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private validator: CartValidatorService
  ) {

  }

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.cartsService.getItem(params.get('cartId')).subscribe(observer => {
				this.cart = { ...observer };
				delete observer._id;
				
				var formControlDict;
				for (let property in observer) {
					formControlDict = { ...formControlDict, property: new FormControl(observer[property]) };
				}

				this.editCartForm = this.formBuilder.group(observer);
			});
		});
  }

	onSubmit(cartData) {
		if (this.validator.isValid(cartData))
		{
			console.log(cartData);
			this.cartsService.editItem(cartData, this.cart._id).subscribe(observer => {});
			this.router.navigate(['/']);
		} else {
			alert("Invalid Edit");
		}
	}
}
