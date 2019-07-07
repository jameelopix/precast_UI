import { TestBed, inject } from '@angular/core/testing';

import { PurchaseOrderItemService } from './purchase-order-item.service';

describe('PurchaseOrderItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseOrderItemService]
    });
  });

  it('should be created', inject([PurchaseOrderItemService], (service: PurchaseOrderItemService) => {
    expect(service).toBeTruthy();
  }));
});
