import { TestBed } from '@angular/core/testing';

import { CommandService } from './commands.service';

describe('CommandsService', () => {
  let service: CommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
