import { Component, OnInit } from '@angular/core';
import { HistorialAsistenciaService } from '../../servicios/historial-asistencia.service';
import { Estudiante } from '../../interfaces/estudiante';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Inscripcion } from '../../interfaces/Inscripcion';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { FormularioAsignarMateriaEstudianteComponent } from '../formulario-asignar-materia-estudiante/formulario-asignar-materia-estudiante.component';
@Component({
  selector: 'app-asignar-materia-estudiant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-materia-estudiant.component.html',
  styleUrls: ['./asignar-materia-estudiant.component.sass']
})
export class AsignarMateriaEstudiantComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudianteFiltrados: Estudiante[] = [];
  inscripciones: Inscripcion[] = []; 

  constructor(private historialAsistenciaService: HistorialAsistenciaService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.historialAsistenciaService.obtenerEstudaintes().subscribe((data: Estudiante[]) => {
      this.estudiantes = data;
      this.estudianteFiltrados = data;
    });
    
    this.historialAsistenciaService.obtenerInscripciones().subscribe((data: Inscripcion[]) => {
      this.inscripciones = data; 
    });
  }

  obtenerInscripcion(estudianteId: number): Inscripcion | undefined {
    // Encuentra la inscripción para el estudiante
    return this.inscripciones.find(i => i.id_estudiante === estudianteId);
  }

  abrirDialogo(estudianteId: number): void {
    const inscripcion = this.obtenerInscripcion(estudianteId);
    if (inscripcion) {
      this.dialog.open(FormularioAsignarMateriaEstudianteComponent, {
        data: inscripcion // Pasa los datos al diálogo
      });
    } else {
      console.log('No se encontró inscripción para este estudiante');
    }
  }
}
