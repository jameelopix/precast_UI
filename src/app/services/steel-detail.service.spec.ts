import { TestBed, inject } from '@angular/core/testing';

import { SteelDetailService } from './steel-detail.service';

describe('SteelDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SteelDetailService]
    });
  });

  it('should be created', inject([SteelDetailService], (service: SteelDetailService) => {
    expect(service).toBeTruthy();
  }));
});
