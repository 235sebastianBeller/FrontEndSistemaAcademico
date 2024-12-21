import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Estudiante } from '../interfaces/estudiante';
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';  // Importa la interfaz

import{environment} from '@envs/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminAsignarEstudiantesMateriaService {

  private apiUrl =`${environment.API_URL}/inscripcion`;

  constructor(private http: HttpClient) {}

  registrarInscripcion(MateriaAsignadaDocente: MateriaAsignadaDocente): Observable<any> {
    return this.http.post(this.apiUrl, MateriaAsignadaDocente);
  }

  eliminarInscripcion(id_estudiante: number, id_dicta: number) {
    return this.http.delete(`${this.apiUrl}/${id_estudiante}/${id_dicta}`);
  }



}
