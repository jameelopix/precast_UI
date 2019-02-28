import { TestBed, inject } from '@angular/core/testing';

import { SteelItemService } from './steel-item.service';

describe('SteelItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SteelItemService]
    });
  });

  it('should be created', inject([SteelItemService], (service: SteelItemService) => {
    expect(service).toBeTruthy();
  }));
});
