import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Estudiante } from '../interfaces/estudiante';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class EstudiantesAdminService {

  private apiUrl = `${environment.API_URL}/estudiante`;


  constructor(private http: HttpClient) { }

  obtenerListaEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl)
  }
  obtenerEstudiantePorId(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`)
  }

  obtenerUltimoEstudiante(): Observable<Estudiante | null> {
    return this.http.get<Estudiante[]>(this.apiUrl).pipe(
      map(estudiantes => estudiantes.length ? estudiantes[estudiantes.length - 1] : null),
      catchError(this.handleError)
    );
  }

  actualizarEstudiante(id: number, estudiante: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.patch<Estudiante>(`${environment.API_URL}/auth/update/estudiante/${id}`, estudiante)
  }


  addEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${environment.API_URL}/auth/register/estudiante`, estudiante)
  }

  buscarEstudiante(nombre: string, apellido: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/estudiantes?nombre=${nombre}&apellido=${apellido}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; por favor intente de nuevo más tarde.');
  }
}
