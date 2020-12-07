import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartValidatorService } from '../cart-validator.service';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  addCartForm;
  
  constructor(
    private cartsService: CartsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private validator: CartValidatorService
  ) {
    this.addCartForm = this.formBuilder.group({
      number: '',
      manufacturerName: '',
      condition: 'working'
    })
  }

  ngOnInit(): void {
  }

  onSubmit(cartData) {
    if (this.validator.isValid(cartData)) {
      this.cartsService.addToItems(cartData).subscribe(observer => {});
      this.addCartForm.reset();
  
      alert("Cart added!");
      this.router.navigate(['/']);
    } else {
      alert("Invalid Add!");
    }
  }
}
