import { TestBed, inject } from '@angular/core/testing';

import { SubContractorService } from './sub-contractor.service';

describe('SubContractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubContractorService]
    });
  });

  it('should be created', inject([SubContractorService], (service: SubContractorService) => {
    expect(service).toBeTruthy();
  }));
});
