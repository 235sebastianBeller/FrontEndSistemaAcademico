import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarNotasPorMateriaProfesorComponent } from './mostrar-notas-por-materia-profesor.component';

describe('MostrarNotasPorMateriaProfesorComponent', () => {
  let component: MostrarNotasPorMateriaProfesorComponent;
  let fixture: ComponentFixture<MostrarNotasPorMateriaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarNotasPorMateriaProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarNotasPorMateriaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
