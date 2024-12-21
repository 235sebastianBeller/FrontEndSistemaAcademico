import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAdministradorComponent } from './materias-administrador.component';

describe('MateriasAdministradorComponent', () => {
  let component: MateriasAdministradorComponent;
  let fixture: ComponentFixture<MateriasAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriasAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
