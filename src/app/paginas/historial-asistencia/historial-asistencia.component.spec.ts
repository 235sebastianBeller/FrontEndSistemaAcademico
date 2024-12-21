import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { HistorialAsistenciaComponent } from './historial-asistencia.component';

describe('HistorialAsistenciaComponent', () => {
  let component: HistorialAsistenciaComponent;
  let fixture: ComponentFixture<HistorialAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialAsistenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
