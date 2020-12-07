import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cart;

  constructor(
    private route: ActivatedRoute,
    private cartsService: CartsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cart = this.cartsService.getItem(params.get('cartId'));
    });
  }

}
