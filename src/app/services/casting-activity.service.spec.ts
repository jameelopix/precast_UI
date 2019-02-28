import { TestBed, inject } from '@angular/core/testing';

import { CastingActivityService } from './casting-activity.service';

describe('CastingActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CastingActivityService]
    });
  });

  it('should be created', inject([CastingActivityService], (service: CastingActivityService) => {
    expect(service).toBeTruthy();
  }));
});
