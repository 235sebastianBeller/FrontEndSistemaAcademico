import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerEstudiantesComponent } from './admin-ver-estudiantes.component';

describe('AdminVerEstudiantesComponent', () => {
  let component: AdminVerEstudiantesComponent;
  let fixture: ComponentFixture<AdminVerEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVerEstudiantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVerEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
