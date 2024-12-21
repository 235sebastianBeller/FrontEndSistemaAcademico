import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Estudiante } from '../interfaces/estudiante';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class PerfilEstudianteService {

  private apiUrl = `${environment.API_URL}/estudiante`;


  constructor(private http: HttpClient) { }

  obtenerListaEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  obtenerEstudiantePorId(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  actualizarEstudiante(id: number, estudiante: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.patch<Estudiante>(`${environment.API_URL}/auth/update/estudiante/${id}`, estudiante)
  }

  private handleError(error: HttpErrorResponse) {

    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; por favor intente de nuevo más tarde.');
  }
}
