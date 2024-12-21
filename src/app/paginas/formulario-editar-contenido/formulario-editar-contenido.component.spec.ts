import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarContenidoComponent } from './formulario-editar-contenido.component';

describe('FormularioEditarContenidoComponent', () => {
  let component: FormularioEditarContenidoComponent;
  let fixture: ComponentFixture<FormularioEditarContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEditarContenidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioEditarContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
