import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotasComponent } from './detalle-notas.component';

describe('DetalleNotasComponent', () => {
  let component: DetalleNotasComponent;
  let fixture: ComponentFixture<DetalleNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
