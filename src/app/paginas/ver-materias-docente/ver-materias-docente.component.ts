import {ChangeDetectionStrategy, Component,inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import {Materia} from '../../interfaces/materia';
import {MateriaAsignadaDocente} from '../../interfaces/materia-asignada-docente';
import {RouterModule} from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { SelectionColorService } from '../../servicios/selection-color.service';
@Component({
  selector: 'app-ver-materias-docente',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,RouterModule,CommonModule],
  templateUrl: './ver-materias-docente.component.html',
  styleUrl: './ver-materias-docente.component.sass'
})
export class VerMateriasDocenteComponent implements OnInit {
  selectedColor: string = '';
  servicioMateriasProfesor:MateriasProfesorService=inject(MateriasProfesorService);
  authService: AuthService = inject(AuthService);
  materias:MateriaAsignadaDocente[]=[];
  materiasFiltradas:MateriaAsignadaDocente[]=[];

  
  constructor(
    private colorService: SelectionColorService
  ) {}
  anios:string[]=[];
  selectedYear: number = 2024;
  filtrarMateriasAnio(){
    this.materias=this.materiasFiltradas.filter((materia:MateriaAsignadaDocente)=>
      materia.anio===this.selectedYear
    )
  }
  
  filtrarAnios() {
    this.anios = [...new Set(this.materiasFiltradas.map((materia) => materia.anio.toString()))]
      .sort((a, b) => parseInt(b) - parseInt(a)); // Ordenar descendente
  }
  
  
  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = +selectElement.value;
    this.filtrarMateriasAnio()
  }


  ngOnInit(): void {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });
    const idProfesor = this.authService.getUserId();

      this.servicioMateriasProfesor.obtenerMaterias().subscribe(
        response => {          
          this.materias = response.filter(materia => materia.profesor?.id_profesor === idProfesor);
          this.materiasFiltradas=this.materias;
          this.filtrarMateriasAnio();
          this.filtrarAnios();
        },
        error => {
          console.error('Error en la petición GET:', error);
        }
    );
  }
  
  getColorClass(): string {
    switch (this.selectedColor) {
      case 'verde':
        return 'color-verde';
      case 'amarillo':
        return 'color-amarillo';
      default:
        return 'color-azul';
    }
  }

}
