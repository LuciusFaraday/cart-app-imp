import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../carts';
import { CartsService } from '../carts.service';

@Component({
	selector: 'app-cart-list',
	templateUrl: './cart-list.component.html',
	styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

	carts: Cart[];
	constructor(
		private cartsService: CartsService,
		private router: Router
	) {
		
	}

	ngOnInit(): void {
		this.cartsService.getItems().subscribe((observer) => {
			this.carts = observer;
		});
	}

	deleteCart(cartId) {
		this.cartsService.deleteItem(cartId).subscribe((observer) => {
			this.router.navigateByUrl('/');
		});
	}
}
