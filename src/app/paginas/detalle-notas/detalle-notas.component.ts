import { Component, OnInit, inject, numberAttribute } from '@angular/core';
import { DetalleNotasService } from '../../servicios/detalle-notas.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormActuaNotasComponent } from '../form-actua-notas/form-actua-notas.component';
import { Estudiante } from '../../interfaces/estudiante';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { Nota } from '../../interfaces/nota';
import { Materia } from '../../interfaces/materia';
import { MensajeService } from '../mensaje/mensaje.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectionColorService } from '../../servicios/selection-color.service';


@Component({
  selector: 'app-detalle-notas',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './detalle-notas.component.html',
  styleUrls: ['./detalle-notas.component.sass'],
})
export class DetalleNotasComponent implements OnInit {
  selectedColor: string = '';
  isLoading = true;
  notasPorTrimestre: { [key: number]: any } = {};
  notas: Nota[] = [];
  estudiantes: Estudiante[] = [];
  materiasAsignadas: Materia[] = [];
  profesores: MateriaAsignadaDocente[] = [];
  selectedYear: number = new Date().getFullYear();
  filteredProfesores: MateriaAsignadaDocente[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  filteredEstudiantes: Estudiante[] = [];
  nombresMaterias: { [id_materia: number]: string } = {};
  notasPorMateria: {
    [id_dicta: number]: {
      trimestre: number;
      notasPorTipo: { [tipo: string]: number[] };
    }[];
  } = {};
  idDicta: number = 0;
  idEstudiante: number = 0;
  route: ActivatedRoute = inject(ActivatedRoute);
  form: FormGroup;
  anio:number=2024;
  constructor(
    private colorService: SelectionColorService,
    private fb: FormBuilder,
    private detalleNotasService: DetalleNotasService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private mensajeService:MensajeService

  ) {
    this.idDicta = +this.route.snapshot.params['id_dicta'];
    this.idEstudiante = +this.route.snapshot.params['id_estudiante'];
    this.anio = +this.route.snapshot.params['anio'];
    this.form = this.fb.group({
      ser: [0],
      saber: [0],
      hacer: [0],
      decidir: [0],
    });
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.isLoading = true;
    this.obtenerEstudiantes();
    this.obtenerNotas();
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; 
    });
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

  filtrarNotasEstudianteMateria(idEstudiante: number, idMateria: number): void {
    const notasEstudianteMateria = this.notas.filter(
      (nota) =>
        nota.estudiante?.id_estudiante === idEstudiante &&
        nota.materiaAsignada?.id_dicta === idMateria
        && nota.anio==this.anio
    );

    const notasAgrupadasPorTrimestre: {
      [trimestre: number]: { [tipo: string]: any[] };
    } = {};

    notasEstudianteMateria.forEach((nota) => {
      const trimestre = nota.trimestre;
      if (!notasAgrupadasPorTrimestre[trimestre]) {
        notasAgrupadasPorTrimestre[trimestre] = {
          ser: [],
          hacer: [],
          saber: [],
          decidir: [],
        };
      }
      if (nota.tipo in notasAgrupadasPorTrimestre[trimestre]) {
        notasAgrupadasPorTrimestre[trimestre][nota.tipo].push(nota);
      }
    });

    this.notasPorTrimestre = notasAgrupadasPorTrimestre;
  }

  obtenerNotas(): void {
    this.detalleNotasService.obtenerNotasPorAno(this.selectedYear).subscribe(
      (notas: Nota[]) => {
        this.notas = notas;
        this.filtrarNotasEstudianteMateria(this.idEstudiante, this.idDicta);
          this.isLoading = false;
        this.filtrarNotasEstudianteMateria(this.idEstudiante, this.idDicta);
          this.isLoading = false;
      },
      (error: any) => {
        console.error('Error en la petición de notas:', error);
      }
    );
  }

  obtenerEstudiantes(): void {
    this.detalleNotasService.obtenerEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.estudiantes = estudiantes;
        this.filteredEstudiantes = estudiantes;
        this.estudianteSeleccionado =
          estudiantes.find((est) => est.id_estudiante === this.idEstudiante) ||
          null;
      },
      (error: any) => {
        console.error('Error en la petición de estudiantes:', error);
      }
    );
  }

  // abrir el modal
  abrirModal(trimestre: any): void {
    const dialogRef = this.dialog.open(FormActuaNotasComponent, {
      width: '400px',
      data: { ...trimestre },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const notasAActualizar: any[] = Object.values(result).map(
          (data: any) => {
            return {
              id: data.id,
              id_dicta: data.materiaAsignada.id_dicta,
              id_estudiante:data.estudiante.id_estudiante,
              fecha: new Date().toLocaleDateString(),
              trimestre: data.trimestre,
              tipo: data.tipo,
              nota: data.nota,
            };
          }
        );

         notasAActualizar.forEach((nota: any) => {
          if (nota.id) {
            this.actualizarNota(nota);


          } else {
            console.warn('Nota con id no definido:', nota);
          }
        });
      }
    });
  }

  obtenerNotaId(tipo: string, trimestre: number): number | undefined {
    const nota = this.notas.find(
      (n) =>
        n.tipo === tipo &&
        n.trimestre === trimestre &&
        n.estudiante?.id_estudiante === this.idEstudiante &&
        n.materiaAsignada?.id_dicta === this.idDicta
    );
    return nota ? nota.id : undefined;
  }

  agruparNotasPorMateria(): void {
    this.notasPorMateria = {};

    this.notas.forEach((nota) => {
      const id_dicta = nota.materiaAsignada.id_dicta;
      const trimestre = nota.trimestre;
      const tipo = nota.tipo;
      const notaValue = nota.nota;

      if (!this.notasPorMateria[id_dicta]) {
        this.notasPorMateria[id_dicta] = [];
      }

      let trimestreExistente = this.notasPorMateria[id_dicta].find(
        (t) => t.trimestre === trimestre
      );

      if (!trimestreExistente) {
        trimestreExistente = {
          trimestre,
          notasPorTipo: { hacer: [], decidir: [], saber: [], ser: [] },
        };
        this.notasPorMateria[id_dicta].push(trimestreExistente);
      }

      if (tipo in trimestreExistente.notasPorTipo) {
        trimestreExistente.notasPorTipo[tipo].push(notaValue);
      }
    });

  }

  actualizarNota(nota: Nota): void {

    if (nota.nota > 100 || nota.nota < 30) {
      this.mensajeService.mostrarMensajesError( 'error',['La nota debe estar entre 30 y 100.']);
      return;
  }
    this.detalleNotasService.actualizarNota(nota).subscribe(
      (notaActualizada: Nota) => {
        const index = this.notas.findIndex((n) => n.id === nota.id);
        if (index !== -1) {
          this.notas[index].nota = nota.nota;
          this.notas[index].fecha = nota.fecha;

          this.notas[index].nota = nota.nota;
          this.notas[index].fecha = nota.fecha;
        }
      },
      (error: any) => {
        console.error('Error al actualizar la nota:', error);
        this.mensajeService.mostrarMensajesError( 'error',error.error.message);
      }
    );
  }











  convertToNumber(value: string): number {
    return parseFloat(value);
  }
}
