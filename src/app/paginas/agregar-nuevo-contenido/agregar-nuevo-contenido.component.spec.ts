import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNuevoContenidoComponent } from './agregar-nuevo-contenido.component';

describe('AgregarNuevoContenidoComponent', () => {
  let component: AgregarNuevoContenidoComponent;
  let fixture: ComponentFixture<AgregarNuevoContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarNuevoContenidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarNuevoContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
