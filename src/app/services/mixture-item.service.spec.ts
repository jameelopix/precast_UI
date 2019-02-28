import { TestBed, inject } from '@angular/core/testing';

import { MixtureItemService } from './mixture-item.service';

describe('MixtureItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MixtureItemService]
    });
  });

  it('should be created', inject([MixtureItemService], (service: MixtureItemService) => {
    expect(service).toBeTruthy();
  }));
});
