import { TestBed } from '@angular/core/testing';

import { ActiveService } from './active.service';

describe('ActiveServiceService', () => {
  let service: ActiveService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
