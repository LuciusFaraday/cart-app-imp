import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartValidatorService {

  isValid(cart) {
    var isManufacturerNameValid = cart.manufacturerName.length <= 50;
    var isNumberValid = cart.number.length == 8;
    cart.number.split("").forEach(digit => {
      isNumberValid = isNumberValid && ('0' <= digit && digit <= '9');
    });
  
    var checksum = 0;
    cart.number.split("").forEach(digit => {
      checksum += parseInt(digit);
    });
    if (checksum % 10 != 0)
      isNumberValid = false;
      
    var res = isNumberValid && isManufacturerNameValid;
    return res;
  }
  constructor() { }
}
