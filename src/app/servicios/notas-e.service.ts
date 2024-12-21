import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Estudiante } from '../interfaces/estudiante';
import {Nota} from '../interfaces/notas'
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';
import {environment} from "@envs/environment"
@Injectable({
  providedIn: 'root'
})
export class NotasProfesorService {


  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  getEstudiante(id: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiante`).pipe(
      catchError(this.handleError)
    );
  }

  getNota(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/nota`).pipe(
      catchError(this.handleError)
    );
  }

  getMateriaAsignadaProfesor(id: number): Observable<MateriaAsignadaDocente> {
    return this.http.get<MateriaAsignadaDocente>(`${this.apiUrl}/materia-asignada-profesor/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
