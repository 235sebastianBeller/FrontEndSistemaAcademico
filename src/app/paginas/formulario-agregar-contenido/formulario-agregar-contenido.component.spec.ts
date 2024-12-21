import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarContenidoComponent } from './formulario-agregar-contenido.component';

describe('FormularioAgregarContenidoComponent', () => {
  let component: FormularioAgregarContenidoComponent;
  let fixture: ComponentFixture<FormularioAgregarContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAgregarContenidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAgregarContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
