import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActuaNotasComponent } from './form-actua-notas.component';

describe('FormActuaNotasComponent', () => {
  let component: FormActuaNotasComponent;
  let fixture: ComponentFixture<FormActuaNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActuaNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormActuaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
