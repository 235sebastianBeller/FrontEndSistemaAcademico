import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriaEstudianteComponent } from './asignar-materia-estudiante.component';

describe('AsignarMateriaEstudianteComponent', () => {
  let component: AsignarMateriaEstudianteComponent;
  let fixture: ComponentFixture<AsignarMateriaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarMateriaEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarMateriaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
