import { TestBed } from '@angular/core/testing';

import { EnrichedStampService } from './enriched-stamp.service';

describe('EnrichedStampService', () => {
  let service: EnrichedStampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrichedStampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
