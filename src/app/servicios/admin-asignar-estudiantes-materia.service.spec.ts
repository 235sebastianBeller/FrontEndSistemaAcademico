import { TestBed } from '@angular/core/testing';

import { AdminAsignarEstudiantesMateriaService } from './admin-asignar-estudiantes-materia.service';

describe('AdminAsignarEstudiantesMateriaService', () => {
  let service: AdminAsignarEstudiantesMateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAsignarEstudiantesMateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
