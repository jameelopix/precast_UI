import { TestBed, inject } from '@angular/core/testing';

import { ItemBasicAmountDetailsService } from './item-basic-amount-details.service';

describe('ItemBasicAmountDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemBasicAmountDetailsService]
    });
  });

  it('should be created', inject([ItemBasicAmountDetailsService], (service: ItemBasicAmountDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
