import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAsistenciaPorMateriaComponent } from './ver-asistencia-por-materia.component';

describe('VerAsistenciaPorMateriaComponent', () => {
  let component: VerAsistenciaPorMateriaComponent;
  let fixture: ComponentFixture<VerAsistenciaPorMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAsistenciaPorMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerAsistenciaPorMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
