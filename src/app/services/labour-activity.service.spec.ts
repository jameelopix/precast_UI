import { TestBed, inject } from '@angular/core/testing';

import { LabourActivityService } from './labour-activity.service';

describe('LabourActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabourActivityService]
    });
  });

  it('should be created', inject([LabourActivityService], (service: LabourActivityService) => {
    expect(service).toBeTruthy();
  }));
});
