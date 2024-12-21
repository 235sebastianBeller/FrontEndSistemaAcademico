import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMateriaComponent } from './mostrar-materia.component';

describe('MostrarMateriaComponent', () => {
  let component: MostrarMateriaComponent;
  let fixture: ComponentFixture<MostrarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
