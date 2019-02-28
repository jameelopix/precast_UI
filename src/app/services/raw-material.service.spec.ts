import { TestBed, inject } from '@angular/core/testing';

import { RawMaterialService } from './raw-material.service';

describe('RawMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RawMaterialService]
    });
  });

  it('should be created', inject([RawMaterialService], (service: RawMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
