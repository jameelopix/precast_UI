import { TestBed, inject } from '@angular/core/testing';

import { LabourRateService } from './labour-rate.service';

describe('LabourRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabourRateService]
    });
  });

  it('should be created', inject([LabourRateService], (service: LabourRateService) => {
    expect(service).toBeTruthy();
  }));
});
