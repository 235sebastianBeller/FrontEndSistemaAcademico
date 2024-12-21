import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotaService } from '../../servicios/nota.service';
import { Nota } from '../../interfaces/nota';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { Materias } from '../../interfaces/materias';
import { Estudiante } from '../../interfaces/estudiante';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../servicios/auth.service';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectionColorService } from '../../servicios/selection-color.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,MatProgressSpinnerModule,MatButtonModule,MatIconModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.sass']
})
export class NotasComponent implements OnInit {
  selectedColor: string = '';
  isLoading = true;
  notas: Nota[] = [];
  notasPorMateria: { [id_dicta: number]: { trimestre: number; notasPorTipo: { [tipo: string]: number[] } }[] } = {};
  profesores: MateriaAsignadaDocente[] = [];
  estudiantes: Estudiante[] = [];
  materiasAsignadas: Materias[] = [];
  selectedYear: number = 2024;
  filteredProfesores: MateriaAsignadaDocente[] = [];
  filteredEstudiantes: Estudiante[] = [];
  nombresMaterias: { [id_materia: number]: string } = {};
  anios:string[]=[];

  constructor(private colorService: SelectionColorService,private readonly notaService: NotaService, private readonly authService:AuthService) {}

  ngOnInit(): void {
    this.isLoading=true;
    this.isLoading=true;
    this.obtenerProfesores();
    this.obtenerEstudiantes();
    this.obtenerNotas();
 
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });
  }

  obtenerAniosNotas(){
    this.notaService.obtenerTodosLosAnios().subscribe(
      (response)=>{

        this.anios=response;
      }
      ,
      (error)=>{
        console.log(error)
      }
    )
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
  
  obtenerIdEstudiante():number{
    return this.authService.getUserId()
  }

  obtenerProfesores(): void {
    this.notaService.obtenerProfesores().subscribe(
      (profesores: MateriaAsignadaDocente[]) => {
        this.profesores = profesores;
        this.filteredProfesores = profesores;
        this.cargarNombresMaterias();
      },
      (error: any) => {
        console.error('Error en la petición de profesores:', error);
      }
    );
  }

  obtenerEstudiantes(): void {
    this.notaService.obtenerEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.estudiantes = estudiantes;
        this.filteredEstudiantes = estudiantes;
      },
      (error: any) => {
        console.error('Error en la petición de estudiantes:', error);
      }
    );
  }

  onYearChange(event: Event): void {
    this.isLoading=true;
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = +selectElement.value;
    this.obtenerNotas(); // Actualizar notas al cambiar el año
  }

  obtenerNotas(): void {
    this.notaService.obtenerNotasPorAno(this.selectedYear).subscribe(
      (notas: Nota[]) => {
        this.notas = notas;
        this.agruparNotasPorMateria();
        this.obtenerAniosNotas();
        this.isLoading=false;
        this.isLoading=false;
      },
      (error: any) => {
        console.error('Error en la petición de notas:', error);
      }
    );
  }

  cargarNombresMaterias(): void {
    this.filteredProfesores.forEach((materia: MateriaAsignadaDocente) => {
      const id_materia = materia.id_dicta;
      const nombre = materia.materia?.nombre;
      if (id_materia && nombre) {
        this.nombresMaterias[id_materia] = nombre;
      }
    });
  }
  agruparNotasPorMateria(): void {
    this.notasPorMateria = {};

    this.notas.forEach(nota => {
      const id_dicta = nota.materiaAsignada.id_dicta;
      const trimestre = nota.trimestre;
      const tipo = nota.tipo; // "hacer", "decidir", "saber", "ser"
      const notaValue = nota.nota;

      if (nota.estudiante.id_estudiante==this.authService.getUserId()){


        if (!this.notasPorMateria[id_dicta]) {
          this.notasPorMateria[id_dicta] = [];
        }

        let trimestreExistente = this.notasPorMateria[id_dicta].find(t => t.trimestre === trimestre);

        if (!trimestreExistente) {
          trimestreExistente = { trimestre, notasPorTipo: { hacer: [], decidir: [], saber: [], ser: [] } };
          this.notasPorMateria[id_dicta].push(trimestreExistente);
        }

        if (tipo in trimestreExistente.notasPorTipo) {
          trimestreExistente.notasPorTipo[tipo].push(notaValue);
        }
      }
    });
  }

  calcularPromedioPorTipo(id_dicta: number, trimestre: number, tipo: string): number {
    const trimestres = this.notasPorMateria[id_dicta];
    if (!trimestres) return 0;

    const trimestreExistente = trimestres.find(t => t.trimestre === trimestre);
    if (!trimestreExistente) return 0;

    const notasDelTipo = trimestreExistente.notasPorTipo[tipo];
    if (!notasDelTipo) return 0;

    const totalNotas = notasDelTipo.reduce((sum, nota) => sum + nota, 0);
    return totalNotas / notasDelTipo.length;
  }

  calcularPromedioGlobalPorTrimestre(id_dicta: number, trimestre: number): number {
    const tipos = ["hacer", "decidir", "saber", "ser"];
    let sumaPromedios = 0;
    let tiposConNotas = 0;

    tipos.forEach(tipo => {
      const promedioPorTipo = this.calcularPromedioPorTipo(id_dicta, trimestre, tipo);
      if (promedioPorTipo > 0) {
        sumaPromedios += promedioPorTipo;
        tiposConNotas++;
      }
    });

    return tiposConNotas > 0 ? sumaPromedios / tiposConNotas : 0;

  }

  calcularPromedioGeneral(id_dicta: number): number {
    const trimestres = [1, 2, 3];
    let sumaPromedios = 0;
    let trimestresConNotas = 0;

    trimestres.forEach(trimestre => {
      const promedioTrimestre = this.calcularPromedioGlobalPorTrimestre(id_dicta, trimestre);
      if (!isNaN(promedioTrimestre) && promedioTrimestre > 0) {
        sumaPromedios += promedioTrimestre;
        trimestresConNotas++;
      }
    });

    return trimestresConNotas > 0 ? sumaPromedios / 3 : 0; // Retorna el promedio general


  }

  determinarEstado(promedio: number): string {
    if (promedio >= 70) return 'Aprobado';
    if (promedio >= 50) return 'En recuperación';
    return 'Reprobado';
  }

  //Agregamos exportación a pdf
  exportarPDF(): void {
    const doc: any = new jsPDF();
    const userId = this.authService.getUserId();
    const estudiante = this.estudiantes.find(est => est.id_estudiante === userId);
    const estudianteNombre = estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : 'Estudiante desconocido';

    doc.setFontSize(18);
    doc.text('Reporte de Notas', 10, 10);
    doc.setFontSize(12);

    doc.text(`Estudiante: ${estudianteNombre}`, 10, 20);
    let currentY = 30;

    for (const id_dicta in this.notasPorMateria) {
      const materia = this.nombresMaterias[id_dicta] || 'Materia desconocida';
      doc.text(`Materia: ${materia}`, 10, currentY);
      currentY += 10;

      const rows: any[] = [];
      const trimestres = this.notasPorMateria[id_dicta];

      const trimestresAgrupados: Record<number, { hacer: number; decidir: number; saber: number; ser: number }> = {};

      trimestres.forEach(trimestreData => {
        const trimestre = trimestreData.trimestre;
        if (!trimestresAgrupados[trimestre]) {
          trimestresAgrupados[trimestre] = { hacer: 0, decidir: 0, saber: 0, ser: 0 };
        }

        const tipos = ['hacer', 'decidir', 'saber', 'ser'] as const;

        tipos.forEach(tipo => {
          trimestresAgrupados[trimestre][tipo] = this.calcularPromedioPorTipo(Number(id_dicta), trimestre, tipo);

        });
      });

      for (const trimestre in trimestresAgrupados) {
        const datos = trimestresAgrupados[trimestre];
        const promedioTrimestre = (datos.hacer + datos.decidir + datos.saber + datos.ser) / 4;
        rows.push([
          `Trimestre ${trimestre}`,
          datos.hacer.toFixed(2),
          datos.decidir.toFixed(2),
          datos.saber.toFixed(2),
          datos.ser.toFixed(2),
          promedioTrimestre.toFixed(2),
        ]);
      }

      doc.autoTable({
        head: [['Trimestre', 'Hacer', 'Decidir', 'Saber', 'Ser', 'Promedio']],
        body: rows,
        startY: currentY,
      });

      currentY = (doc as any).lastAutoTable.finalY + 10;

      const promedioGeneral = this.calcularPromedioGeneral(Number(id_dicta));
      const estado = this.determinarEstado(promedioGeneral);
      doc.text(`Promedio General: ${promedioGeneral.toFixed(2)} (${estado})`, 10, currentY);
      currentY += 10;
    }

    doc.save(`reporte_notas_usuario_${userId}.pdf`);
  }

  //Agregamos exportar a excel

  exportarExcel(): void {
    const userId = this.authService.getUserId();
    const estudiante = this.estudiantes.find(est => est.id_estudiante === userId);
    const estudianteNombre = estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : 'Estudiante desconocido';

    // Datos que queremos exportar a Excel
    let data: any[] = [];
    data.push(['Reporte de Notas']);
    data.push([`Estudiante: ${estudianteNombre}`]);

    for (const id_dicta in this.notasPorMateria) {
      const materia = this.nombresMaterias[id_dicta] || 'Materia desconocida';
      data.push([`Materia: ${materia}`]);

      const trimestres = this.notasPorMateria[id_dicta];
      const trimestresAgrupados: Record<number, { hacer: number; decidir: number; saber: number; ser: number }> = {};

      trimestres.forEach(trimestreData => {
        const trimestre = trimestreData.trimestre;
        if (!trimestresAgrupados[trimestre]) {
          trimestresAgrupados[trimestre] = { hacer: 0, decidir: 0, saber: 0, ser: 0 };
        }

        const tipos = ['hacer', 'decidir', 'saber', 'ser'] as const;

        tipos.forEach(tipo => {
          trimestresAgrupados[trimestre][tipo] = this.calcularPromedioPorTipo(Number(id_dicta), trimestre, tipo);
        });
      });

      // Agregar los datos por trimestre a la tabla
      for (const trimestre in trimestresAgrupados) {
        const datos = trimestresAgrupados[trimestre];
        const promedioTrimestre = (datos.hacer + datos.decidir + datos.saber + datos.ser) / 4;
        data.push([
          `Trimestre ${trimestre}`,
          datos.hacer.toFixed(2),
          datos.decidir.toFixed(2),
          datos.saber.toFixed(2),
          datos.ser.toFixed(2),
          promedioTrimestre.toFixed(2),
        ]);
      }

      // Promedio general de la materia
      const promedioGeneral = this.calcularPromedioGeneral(Number(id_dicta));
      const estado = this.determinarEstado(promedioGeneral);
      data.push([`Promedio General: ${promedioGeneral.toFixed(2)} (${estado})`]);
    }

    // Crear un libro de trabajo (workbook)
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = { Sheets: { 'Reporte de Notas': ws }, SheetNames: ['Reporte de Notas'] };

    // Exportar el archivo Excel
    XLSX.writeFile(wb, `reporte_notas_usuario_${userId}.xlsx`);
  }




}
