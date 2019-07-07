import { TestBed, inject } from '@angular/core/testing';

import { ItemAmountDetailsService } from './item-amount-details.service';

describe('ItemAmountDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemAmountDetailsService]
    });
  });

  it('should be created', inject([ItemAmountDetailsService], (service: ItemAmountDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
