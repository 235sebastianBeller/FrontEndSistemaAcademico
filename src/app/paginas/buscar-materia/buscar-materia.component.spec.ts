import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMateriaComponent } from './buscar-materia.component';

describe('BuscarMateriaComponent', () => {
  let component: BuscarMateriaComponent;
  let fixture: ComponentFixture<BuscarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
