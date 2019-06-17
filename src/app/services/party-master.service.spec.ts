import { TestBed, inject } from '@angular/core/testing';

import { PartyMasterService } from './party-master.service';

describe('PartyMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyMasterService]
    });
  });

  it('should be created', inject([PartyMasterService], (service: PartyMasterService) => {
    expect(service).toBeTruthy();
  }));
});
