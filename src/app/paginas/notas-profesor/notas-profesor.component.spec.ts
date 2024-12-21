import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasProfesorComponent } from './notas-profesor.component';

describe('NotasProfesorComponent', () => {
  let component: NotasProfesorComponent;
  let fixture: ComponentFixture<NotasProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
