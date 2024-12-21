import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAsistenciaDocentesComponent } from './registro-asistencia-docentes.component';

describe('RegistroAsistenciaDocentesComponent', () => {
  let component: RegistroAsistenciaDocentesComponent;
  let fixture: ComponentFixture<RegistroAsistenciaDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAsistenciaDocentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroAsistenciaDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
