import { TestBed, inject } from '@angular/core/testing';

import { PurchaseRegisterService } from './purchase-register.service';

describe('PurchaseRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseRegisterService]
    });
  });

  it('should be created', inject([PurchaseRegisterService], (service: PurchaseRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
