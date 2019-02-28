import { TestBed, inject } from '@angular/core/testing';

import { MixtureService } from './mixture.service';

describe('MixtureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MixtureService]
    });
  });

  it('should be created', inject([MixtureService], (service: MixtureService) => {
    expect(service).toBeTruthy();
  }));
});
