import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriaAsignadaAEstudianteComponent } from './asignar-materia-asignada-a-estudiante.component';

describe('AsignarMateriaAsignadaAEstudianteComponent', () => {
  let component: AsignarMateriaAsignadaAEstudianteComponent;
  let fixture: ComponentFixture<AsignarMateriaAsignadaAEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarMateriaAsignadaAEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarMateriaAsignadaAEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
