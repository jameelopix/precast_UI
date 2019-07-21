import { TestBed, inject } from '@angular/core/testing';

import { PurchaseRegisterItemService } from './purchase-register-item.service';

describe('PurchaseRegisterItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseRegisterItemService]
    });
  });

  it('should be created', inject([PurchaseRegisterItemService], (service: PurchaseRegisterItemService) => {
    expect(service).toBeTruthy();
  }));
});
