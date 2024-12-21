import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAsignarMateriaEstudianteComponent } from './formulario-asignar-materia-estudiante.component';

describe('FormularioAsignarMateriaEstudianteComponent', () => {
  let component: FormularioAsignarMateriaEstudianteComponent;
  let fixture: ComponentFixture<FormularioAsignarMateriaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAsignarMateriaEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAsignarMateriaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
