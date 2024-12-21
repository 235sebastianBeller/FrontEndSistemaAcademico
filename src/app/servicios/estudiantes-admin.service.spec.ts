import { TestBed } from '@angular/core/testing';

import { EstudiantesAdminService } from './estudiantes-admin.service';

describe('EstudiantesAdminService', () => {
  let service: EstudiantesAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudiantesAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
