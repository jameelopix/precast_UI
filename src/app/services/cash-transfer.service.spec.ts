import { TestBed, inject } from '@angular/core/testing';

import { CashTransferService } from './cash-transfer.service';

describe('CashTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashTransferService]
    });
  });

  it('should be created', inject([CashTransferService], (service: CashTransferService) => {
    expect(service).toBeTruthy();
  }));
});
