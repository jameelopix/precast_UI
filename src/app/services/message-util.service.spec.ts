import { TestBed, inject } from '@angular/core/testing';

import { MessageUtilService } from './message-util.service';

describe('MessageUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageUtilService]
    });
  });

  it('should be created', inject([MessageUtilService], (service: MessageUtilService) => {
    expect(service).toBeTruthy();
  }));
});
