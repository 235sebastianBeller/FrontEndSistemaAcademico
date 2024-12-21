import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstudiantesProfesorComponent } from './lista-estudiantes-profesor.component';

describe('ListaEstudiantesProfesorComponent', () => {
  let component: ListaEstudiantesProfesorComponent;
  let fixture: ComponentFixture<ListaEstudiantesProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEstudiantesProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEstudiantesProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
