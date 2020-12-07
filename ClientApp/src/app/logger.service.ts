import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logs: string[] = [];

  constructor() { }

  log(funcName: string, argument?) {
    var message = `${funcName}(${JSON.stringify(argument)})`;
    this.logs.push(message);
    console.log(message);
  }
}
