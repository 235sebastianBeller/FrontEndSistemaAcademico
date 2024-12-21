import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NotasProfesorService } from '../../servicios/notas-e.service';
import { Nota } from '../../interfaces/notas';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectionColorService } from '../../servicios/selection-color.service';

interface EstudianteConPromedios {
  id:number;
  id_paralelo:number;
  id_estudiante:number;
  nombre: string;
  apellido: string;
  trimestre1?: number;
  trimestre2?: number;
  trimestre3?: number;
  promedio?: number;
}

@Component({
  selector: 'app-mostrar-notas-por-materia-profesor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mostrar-notas-por-materia-profesor.component.html',
  styleUrls: ['./mostrar-notas-por-materia-profesor.component.sass']
})
export class MostrarNotasPorMateriaProfesorComponent implements OnInit {
  selectedColor: string = '';
  datos: MateriaAsignadaDocente = {} as MateriaAsignadaDocente;
  estudiantesPromedios: EstudianteConPromedios[] = [];
  paralelos: string[] = [];
  paraleloSeleccionado: string = '';
  notas: Nota[] = [];
  idMateria:string="";
  isLoading = true;
  anio?:number=new Date().getFullYear();
  
  constructor(
    private colorService: SelectionColorService,
    private notasProfesorService: NotasProfesorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });
    this.isLoading = true;
    this.idMateria = this.route.snapshot.paramMap.get('id_dicta')||"";
    this.anio = +(this.route.snapshot.paramMap.get('anio')||new Date().getFullYear());


    if (this.idMateria) {
      const id = +(this.idMateria);
      this.cargarDatosMateriaAsignada(id);
      this.cargarNotasEstudiantes(id); 
    } else {
      console.error('ID de materia no encontrado en la URL');
    }
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
  
  cargarDatosMateriaAsignada(id: number) {
    this.notasProfesorService.getMateriaAsignadaProfesor(id).subscribe(
      (data: MateriaAsignadaDocente) => {
        this.datos = data;
        this.paralelos = data.paralelo || [];
  

  

      },
      (error: any) => {
        console.error('Error al cargar datos de la materia asignada:', error);
      }
    );
  }


  cargarNotasEstudiantes(idDicta: number, idEstudiante?: number, tipo?: string) {
    this.notasProfesorService.getNota().subscribe(
      (data: any[]) => {
        this.notas = data.filter(nota =>
          nota.materiaAsignada.id_dicta==idDicta && nota.materiaAsignada.anio==this.anio
        );
        this.calcularPromediosPorEstudiante();
        this.isLoading = false;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error al cargar notas del estudiante:', error);
      }
    );
  }

  calcularPromediosPorEstudiante() {
    const estudiantesMap: { [id: number]: EstudianteConPromedios } = {};

    this.notas.forEach(nota => {
      const estudianteId = nota.estudiante.id_estudiante;

      if (!estudiantesMap[estudianteId]) {
        estudiantesMap[estudianteId] = {
          nombre: nota.estudiante.nombre,
          apellido: nota.estudiante.apellido,
          id_estudiante:nota.estudiante.id_estudiante,
          id:nota.estudiante.id_estudiante,
          id_paralelo:nota.estudiante.id_paralelo,
          trimestre1: 0,
          trimestre2: 0,
          trimestre3: 0,
          promedio: 0
        };
      }

      const estudiante = estudiantesMap[estudianteId];

      switch (nota.trimestre) {
        case 1:
          estudiante.trimestre1 = (estudiante.trimestre1 || 0) + nota.nota;
          break;
        case 2:
          estudiante.trimestre2 = (estudiante.trimestre2 || 0) + nota.nota;
          break;
        case 3:
          estudiante.trimestre3 = (estudiante.trimestre3 || 0) + nota.nota;
          break;
      }
    });

    this.estudiantesPromedios = Object.values(estudiantesMap).map(estudiante => {
      // Suponiendo que cada trimestre tiene 4 notas
      estudiante.trimestre1 = (estudiante.trimestre1! / 4) || 0;
      estudiante.trimestre2 = (estudiante.trimestre2! / 4) || 0;
      estudiante.trimestre3 = (estudiante.trimestre3! / 4) || 0;

      const trimestres = [estudiante.trimestre1, estudiante.trimestre2, estudiante.trimestre3];
      const notasValidas = trimestres.filter(nota => !isNaN(nota));
      estudiante.promedio = notasValidas.length
        ? notasValidas.reduce((a, b) => (a + b), 0) / notasValidas.length
        : 0;

      return estudiante;
    });

  }

  onParaleloChange(paralelo: string) {
    this.paraleloSeleccionado = paralelo;
    const idMateria = this.datos.id_dicta;
    this.cargarNotasEstudiantes(idMateria);
  }
}
