import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { activateAuthGuard } from './activate-auth.guard';

describe('activateAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => activateAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
