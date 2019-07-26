import { TestBed, inject } from '@angular/core/testing';

import { LabourWorkEntryService } from './labour-work-entry.service';

describe('LabourWorkEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabourWorkEntryService]
    });
  });

  it('should be created', inject([LabourWorkEntryService], (service: LabourWorkEntryService) => {
    expect(service).toBeTruthy();
  }));
});
