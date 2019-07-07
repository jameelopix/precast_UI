import { TestBed, inject } from '@angular/core/testing';

import { ElementDetailsService } from './element-details.service';

describe('ElementDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementDetailsService]
    });
  });

  it('should be created', inject([ElementDetailsService], (service: ElementDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
