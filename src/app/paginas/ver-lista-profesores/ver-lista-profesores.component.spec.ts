import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaProfesoresComponent } from './ver-lista-profesores.component';

describe('VerListaProfesoresComponent', () => {
  let component: VerListaProfesoresComponent;
  let fixture: ComponentFixture<VerListaProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerListaProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerListaProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
