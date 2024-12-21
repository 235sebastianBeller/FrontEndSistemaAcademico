import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotasEstudiantesComponent } from './detalle-notas-estudiantes.component';

describe('DetalleNotasEstudiantesComponent', () => {
  let component: DetalleNotasEstudiantesComponent;
  let fixture: ComponentFixture<DetalleNotasEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleNotasEstudiantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleNotasEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
