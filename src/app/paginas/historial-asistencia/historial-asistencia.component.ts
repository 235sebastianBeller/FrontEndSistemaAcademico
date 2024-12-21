import { Component, OnInit,inject } from '@angular/core';
import { HistorialAsistenciaService } from '../../servicios/historial-asistencia.service';
import { Asistencia } from '../../interfaces/asistencia';
import { Profesor } from '../../interfaces/profesor';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {AuthService} from '../../servicios/auth.service';
import {InscripcionService} from '../../servicios/inscripcion.service';
import { SelectionColorService } from '../../servicios/selection-color.service';


@Component({
  selector: 'app-historial-asistencia',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './historial-asistencia.component.html',
  styleUrls: ['./historial-asistencia.component.sass']
})
export class HistorialAsistenciaComponent implements OnInit {
  selectedColor: string = '';
  asistencias: Asistencia[] = [];
  profesores: Profesor[] = [];
  materiasAsignadas: MateriaAsignadaDocente[] = [];
  busqueda: string = '';
  materiasFiltradas: MateriaAsignadaDocente[] = [];
  selectedProfesorId: number | null = null;
  selectedParalelo: string | null = null;
  tipoFiltro: any;
  idMateria:string | undefined;
  router: any;
  servicioAutenticacion:AuthService=inject(AuthService);
  servicioInscripcion:InscripcionService=inject(InscripcionService);
  selectedYear: number = new Date().getFullYear();
  anios:string[]=[];
  constructor(private colorService: SelectionColorService,private readonly historialAsistenciaService: HistorialAsistenciaService) {}

  ngOnInit(): void {

    this.obtenerAsistencias();
    this.obtenerProfesores();
    this.obtenerMateriasAsignadas();
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color;
    });
    
  }
  filtrarAnios() {
    this.anios = [...new Set(this.materiasAsignadas.map((materia) => materia.anio.toString()))]
      .sort((a, b) => parseInt(b) - parseInt(a)); 
  }
  
  
  filtrarMateriasAnio(){
    this.materiasFiltradas=this.materiasAsignadas.filter((materia)=>materia.anio===this.selectedYear);
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
  
  verAsistenciaMateria(idMateria:number): void {
    this.router.navigate(['/asistencia-materia', idMateria.toString()]);
  }

  obtenerAsistencias(): void {
    this.historialAsistenciaService.obtenerAsistencias().subscribe(
      (asistencias) => {
        this.asistencias = asistencias;
      },
      error => {
        console.error('Error en la petición de asistencias:', error);
      }
    );
  }

  obtenerProfesores(): void {
    this.historialAsistenciaService.obtenerProfesores().subscribe(
      (profesores) => {
        this.profesores = profesores;
      },
      error => {
        console.error('Error en la petición de profesores:', error);
      }
    );
  }

  obtenerMateriasAsignadas(): void {
    this.servicioInscripcion.obtenerMaterias(this.servicioAutenticacion.getUserId()).subscribe(
      (materiasAsignadas) => {
        this.materiasAsignadas = materiasAsignadas;
        this.materiasFiltradas=this.materiasAsignadas;
        this.filtrarAnios();
        this.selectedYear=+this.anios[0];
        this.filtrarMateriasAnio()
      },
      error => {
        console.error('Error en la petición de materias asignadas:', error);
      }
    );
  }

  filtrarMaterias(): void {
    this.filtrarMateriasAnio()

    if (this.busqueda.trim() !== '') {
      this.materiasFiltradas = this.materiasFiltradas.filter(materia =>
        materia.materia?.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }

    if (this.selectedProfesorId !== null) {
      this.materiasFiltradas = this.materiasFiltradas.filter(materia =>
        materia.profesor && materia.profesor.id_profesor === this.selectedProfesorId
      );
    }

    if (this.selectedParalelo) {
      this.materiasFiltradas = this.materiasFiltradas.filter(materia =>
        materia.materia && materia.materia.paralelo && materia.materia.paralelo.paralelo === this.selectedParalelo 
      );
    }
  }

  seleccionarProfesor(profesorId: number | null): void {
    this.selectedProfesorId = profesorId;
    this.filtrarMaterias();
  }

  seleccionarParalelo(paralelo: string | null): void {
    this.selectedParalelo = paralelo;
    this.filtrarMaterias();
  }

  calcularTotalClases(materia: MateriaAsignadaDocente): { faltas: number, asistencias: number, licencias: number } {
    let faltas = 0;
    let asistencias = 0;
    let licencias = 0;
    this.asistencias.forEach(asistencia => {
      if (asistencia.materiaAsignada.id_dicta === materia.id_dicta && asistencia.estudiante?.id_estudiante==this.servicioAutenticacion.getUserId()) {
        switch (asistencia.estado) {
          case 'Falta':
            faltas++;
            break;
          case 'Presente':
            asistencias++;
            break;
          case 'Justificado':
            licencias++;
            break;
        }
      }
    });

    return { faltas, asistencias, licencias };
  }
  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = +selectElement.value;
    this.filtrarMateriasAnio()
  }
}
