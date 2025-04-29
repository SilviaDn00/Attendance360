import { TestBed } from '@angular/core/testing';

import { AnomaliesService } from './anomalies.service';

describe('AnomaliesService', () => {
  let service: AnomaliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnomaliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
