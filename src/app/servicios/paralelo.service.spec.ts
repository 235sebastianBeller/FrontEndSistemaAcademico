import { TestBed } from '@angular/core/testing';

import { ParaleloService } from './paralelo.service';

describe('ParaleloService', () => {
  let service: ParaleloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParaleloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
