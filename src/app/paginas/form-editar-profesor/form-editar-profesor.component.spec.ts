import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarProfesorComponent } from './form-editar-profesor.component';

describe('FormEditarProfesorComponent', () => {
  let component: FormEditarProfesorComponent;
  let fixture: ComponentFixture<FormEditarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditarProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEditarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
