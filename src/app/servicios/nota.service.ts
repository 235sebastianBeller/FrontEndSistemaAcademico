import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Nota } from '../interfaces/nota';
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';
import { Materias } from '../interfaces/materias'
import { Estudiante } from '../interfaces/estudiante';
import {environment} from "@envs/environment"

@Injectable({
  providedIn: 'root',
})
export class NotaService {

  private apiUrl = `${environment.API_URL}`; 

  constructor(private http: HttpClient) {}

  obtenerProfesores(): Observable<MateriaAsignadaDocente[]> {
    return this.http.get<MateriaAsignadaDocente[]>(`${this.apiUrl}/materia-asignada-profesor`);
  }
  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiante`);
  }

  obtenerMateriasAsignadas(): Observable<Materias[]> {
    return this.http.get<Materias[]>(`${this.apiUrl}/materias`);
  }

  obtenerTodasLasNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/nota`);
  }

  obtenerTodosLosAnios(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/nota/years`);
  }

  obtenerNotasPorAno(selectedYear: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/nota`).pipe(
      catchError(error => {
        console.error('Error al obtener notas:', error);
        return of([]); 
      }),
      map(notas =>
        notas
          .map((nota: Nota) => ({
            ...nota,
            fecha: nota.fecha, 
            materiaAsignada: {
              ...nota.materiaAsignada,
              fecha: nota.materiaAsignada.fecha 
            }
          }))
          .filter((nota: Nota) => nota.anio === selectedYear)
      )
    );
  }
}
