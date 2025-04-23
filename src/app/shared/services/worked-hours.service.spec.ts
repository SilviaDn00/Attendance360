import { TestBed } from '@angular/core/testing';

import { WorkedHoursService } from './worked-hours.service';

describe('WorkedHoursService', () => {
  let service: WorkedHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkedHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
