import { TestBed, inject } from '@angular/core/testing';

import { ItemFreightAmountDetailsService } from './item-freight-amount-details.service';

describe('ItemFreightAmountDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemFreightAmountDetailsService]
    });
  });

  it('should be created', inject([ItemFreightAmountDetailsService], (service: ItemFreightAmountDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
