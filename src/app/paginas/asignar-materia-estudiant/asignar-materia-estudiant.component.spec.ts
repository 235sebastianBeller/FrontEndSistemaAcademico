import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriaEstudiantComponent } from './asignar-materia-estudiant.component';

describe('AsignarMateriaEstudiantComponent', () => {
  let component: AsignarMateriaEstudiantComponent;
  let fixture: ComponentFixture<AsignarMateriaEstudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarMateriaEstudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarMateriaEstudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
