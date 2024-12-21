import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioCarrucelComponent } from './inicio-carrucel.component';

describe('InicioCarrucelComponent', () => {
  let component: InicioCarrucelComponent;
  let fixture: ComponentFixture<InicioCarrucelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioCarrucelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioCarrucelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
