import { TestBed, inject } from '@angular/core/testing';

import { MatchServiceService } from './match-service.service';

describe('MatchServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchServiceService]
    });
  });

  it('should be created', inject([MatchServiceService], (service: MatchServiceService) => {
    expect(service).toBeTruthy();
  }));
});
