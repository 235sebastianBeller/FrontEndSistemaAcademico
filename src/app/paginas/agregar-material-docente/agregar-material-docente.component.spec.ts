import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMaterialDocenteComponent } from './agregar-material-docente.component';

describe('AgregarMaterialDocenteComponent', () => {
  let component: AgregarMaterialDocenteComponent;
  let fixture: ComponentFixture<AgregarMaterialDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarMaterialDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarMaterialDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
