import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cart } from './carts';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
	providedIn: 'root'
})
export class CarriageService {
	private cartsUrl = 'api/carts';
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	add(cart: Cart): Observable<Cart> {
		return this.http.post<Cart>(this.cartsUrl, cart, this.httpOptions)
			.pipe(
				tap((newCart: Cart) => console.log(`added cart w/ id=${newCart._id}`)),
				catchError(this.errorHandler.handleError<Cart>('add'))
			);
	}


	getAll(): Observable<Cart[]> {
		return this.http.get<Cart[]>(this.cartsUrl)
			.pipe(
				tap(_ => console.log('fetched carts')),
				catchError(this.errorHandler.handleError<Cart[]>('getAll', []))
			);
	}

	get(cartId: Number): Observable<Cart> {
		const url = `${this.cartsUrl}/${cartId}`;
		return this.http.get<Cart>(url);
	}

	delete(cartId: Number)
	{    
		const url = `${this.cartsUrl}/${cartId}`;
		return this.http.delete<Cart>(url, this.httpOptions);

	}

	edit(cart: Cart): Observable<any> {
		return this.http.put(this.cartsUrl, cart, this.httpOptions);
	}

	constructor(
		private http: HttpClient,
		private errorHandler: HttpErrorHandlerService
	) {}
}
