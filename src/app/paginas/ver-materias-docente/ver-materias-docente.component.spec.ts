import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMateriasDocenteComponent } from './ver-materias-docente.component';

describe('VerMateriasDocenteComponent', () => {
  let component: VerMateriasDocenteComponent;
  let fixture: ComponentFixture<VerMateriasDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMateriasDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerMateriasDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
