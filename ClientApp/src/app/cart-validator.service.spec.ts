import { TestBed } from '@angular/core/testing';

import { CartValidatorService } from './cart-validator.service';

describe('CartValidatorService', () => {
  let service: CartValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
