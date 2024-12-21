import { TestBed } from '@angular/core/testing';

import { DetalleNotasEstudiantesService } from './detalle-nota-estudiante.service';

describe('DetalleNotasEstudiantesService', () => {
  let service: DetalleNotasEstudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleNotasEstudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
