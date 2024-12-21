import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';
import { Materia } from '../interfaces/materia';
import { Estudiante } from '../interfaces/estudiante';
import { Nota } from '../interfaces/nota';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root',
})
export class DetalleNotasService {
  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  obtenerProfesores(): Observable<MateriaAsignadaDocente[]> {
    return this.http.get<MateriaAsignadaDocente[]>(`${this.apiUrl}/materia-asignada-profesor`).pipe(
      catchError(error => {
        console.error('Error al obtener profesores:', error);
        return of([]);
      })
    );
  }

  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiante`).pipe(
      catchError(error => {
        console.error('Error al obtener estudiantes:', error);
        return of([]);
      })
    );
  }

  obtenerMateriasAsignadas(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/materias`).pipe(
      catchError(error => {
        console.error('Error al obtener materias asignadas:', error);
        return of([]);
      })
    );
  }

  obtenerTodasLasNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/nota`).pipe(
      catchError(error => {
        console.error('Error al obtener todas las notas:', error);
        return of([]);
      })
    );
  }

  getNotasEstudiante(idEstudiante: number, idDicta: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/nota?id_estudiante=${idEstudiante}&id_dicta=${idDicta}`).pipe(
      catchError(error => {
        console.error('Error al obtener notas del estudiante:', error);
        return of([]);
      })
    );
  }

  getDatosAgrupados(idEstudiante: number, idDicta: number): Observable<any> {
    return this.getNotasEstudiante(idEstudiante, idDicta).pipe(
      map((data: Nota[]) => {
        const agrupadosPorTrimestre = data.reduce((acc, curr) => {
          const trimestre = curr.trimestre;
          if (!acc[trimestre]) {
            acc[trimestre] = { ser: 0, saber: 0, hacer: 0, decidir: 0, total: 0 };
          }

          if (['ser', 'saber', 'hacer', 'decidir'].includes(curr.tipo)) {
            acc[trimestre][curr.tipo as 'ser' | 'saber' | 'hacer' | 'decidir'] = curr.nota;
          }

          acc[trimestre].total = Object.values(acc[trimestre]).reduce((sum, val) => sum + (val || 0), 0);
          return acc;
        }, {} as { [trimestre: number]: { ser: number, saber: number, hacer: number, decidir: number, total: number }});

        return agrupadosPorTrimestre;
      }),
      catchError(error => {
        console.error('Error al agrupar datos:', error);
        return of({});
      })
    );
  }


  obtenerNotasPorAno(selectedYear: number): Observable<Nota[]> {

    return this.obtenerTodasLasNotas().pipe(
      map(notas => {
        return notas.map((nota: Nota) => ({
          ...nota,
          fecha: new Date(nota.fecha),
          materiaAsignada: {
            ...nota.materiaAsignada,
            fecha: new Date(nota.materiaAsignada?.fecha)
          }
        })).filter((nota: Nota) =>{
          return 2024 === 2024});
      }),
      catchError(error => {
        console.error('Error al obtener notas por año:', error);
        return of([]); // Manejo de error
      })
    );
  }
   actualizarNota(nota: Nota): Observable<Nota> {
    return this.http.patch<Nota>(`${environment.API_URL}/nota/${nota.id}`, nota);
  }
}
