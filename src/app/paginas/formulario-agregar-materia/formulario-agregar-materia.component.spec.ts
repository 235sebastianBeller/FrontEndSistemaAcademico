import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarMateriaComponent } from './formulario-agregar-materia.component';

describe('FormularioAgregarMateriaComponent', () => {
  let component: FormularioAgregarMateriaComponent;
  let fixture: ComponentFixture<FormularioAgregarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAgregarMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAgregarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
