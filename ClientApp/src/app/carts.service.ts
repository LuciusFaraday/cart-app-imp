import { Injectable } from '@angular/core';
import { Cart } from './carts';
import { LoggerService } from './logger.service';
import { CarriageService } from './carriage.service';

@Injectable({
	providedIn: 'root'
})
export class CartsService {

	addToItems(cartData) {
		this.logger.log('addToItems', cartData);
		var _cart: Cart = {
			...cartData
		};
		return this.carriage.add(_cart);
	}

	getItems() {
		this.logger.log('getItems');
		return this.carriage.getAll();
	}

	getItem(cartId) {
		this.logger.log('getItem', cartId);
		return this.carriage.get(cartId);
	}

	deleteItem(cartId) {
		this.logger.log('deleteItem', cartId);
		return this.carriage.delete(cartId);
	}

	editItem(cartData, cartId) {
		this.logger.log('editItem', {cartData, cartId});
		var _cart: Cart = {
			_id: cartId,
			...cartData
		}
		return this.carriage.edit(_cart);
	}

	constructor(private logger: LoggerService, private carriage: CarriageService) { }
}
