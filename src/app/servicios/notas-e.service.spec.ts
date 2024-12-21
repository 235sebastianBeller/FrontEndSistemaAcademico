import { TestBed } from '@angular/core/testing';

import { NotasEService } from './notas-e.service';

describe('NotasEService', () => {
  let service: NotasEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
