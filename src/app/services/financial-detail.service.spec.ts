import { TestBed, inject } from '@angular/core/testing';

import { FinancialDetailService } from './financial-detail.service';

describe('FinancialDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinancialDetailService]
    });
  });

  it('should be created', inject([FinancialDetailService], (service: FinancialDetailService) => {
    expect(service).toBeTruthy();
  }));
});
