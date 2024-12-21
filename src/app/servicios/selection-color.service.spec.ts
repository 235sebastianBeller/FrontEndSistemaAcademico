import { TestBed } from '@angular/core/testing';

import { SelectionColorService } from './selection-color.service';

describe('SelectionColorService', () => {
  let service: SelectionColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
