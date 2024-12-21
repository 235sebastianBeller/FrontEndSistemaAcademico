import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAsignarMateriaDocenteComponent } from './formulario-asignar-materia-docente.component';

describe('FormularioAsignarMateriaDocenteComponent', () => {
  let component: FormularioAsignarMateriaDocenteComponent;
  let fixture: ComponentFixture<FormularioAsignarMateriaDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAsignarMateriaDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAsignarMateriaDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
