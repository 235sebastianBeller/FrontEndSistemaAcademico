import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearProfesorComponent } from './form-crear-profesor.component';

describe('FormCrearProfesorComponent', () => {
  let component: FormCrearProfesorComponent;
  let fixture: ComponentFixture<FormCrearProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCrearProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
