import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
	providedIn: 'root'
})
export class HttpErrorHandlerService {

	constructor(
		private logger: LoggerService
	) { }
	handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.logger.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
