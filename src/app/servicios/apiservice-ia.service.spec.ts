import { TestBed } from '@angular/core/testing';

import { APIServiceIAService } from './apiservice-ia.service';

describe('APIServiceIAService', () => {
  let service: APIServiceIAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIServiceIAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
