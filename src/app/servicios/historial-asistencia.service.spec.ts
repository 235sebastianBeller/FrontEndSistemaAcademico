import { TestBed } from '@angular/core/testing';

import { HistorialAsistenciaService } from './historial-asistencia.service';

describe('HistorialAsistenciaService', () => {
  let service: HistorialAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
