import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profesor } from '../interfaces/profesor';
import {environment} from "@envs/environment"

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = `${environment.API_URL}/profesor`;


  constructor(private http: HttpClient) { }

  getProfesores():Observable<Profesor[]>{
    return this.http.get<Profesor[]>(this.apiUrl);
  }
  updateProfesor(id: number, profesorData: Partial<Profesor>): Observable<Profesor> {
    return this.http.patch<Profesor>(`${environment.API_URL}/auth/update/profesor/${id}`, profesorData).pipe(
    );
  }
  addProfesor(profesor: Profesor): Observable<Profesor> {
  return this.http.post<Profesor>(`${environment.API_URL}/auth/register/profesor`, profesor);
  }

  deleteProfesor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al eliminar el profesor:', error);
        return throwError(() => new Error('Error al eliminar el profesor.'));
      })
    );
  }



}
