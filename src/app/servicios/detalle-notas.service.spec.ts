import { TestBed } from '@angular/core/testing';

import { DetalleNotasService } from './detalle-notas.service';

describe('DetalleNotasService', () => {
  let service: DetalleNotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleNotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
