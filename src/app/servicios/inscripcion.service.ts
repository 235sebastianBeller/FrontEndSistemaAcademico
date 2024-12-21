import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import{MateriaAsignadaDocente} from '../interfaces/materia-asignada-docente';
import{Estudiante} from '../interfaces/estudiante';
import {environment} from "@envs/environment";
@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  urlApi:string=`${environment.API_URL}/inscripcion`
  constructor(private readonly http: HttpClient) {

  }

  obtenerMaterias(id_estudiante:number):Observable<MateriaAsignadaDocente[]>{
    return this.http.get<MateriaAsignadaDocente[]>(`${this.urlApi}/estudiante/${id_estudiante}`)

  }

  obtenerInscritosDeMateriaAsignada(id_dicta:number):Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.urlApi}/estudiantes/${id_dicta}`)

  }

  obtenerInscripcionesDeMateriaAsignada(id_dicta:number):Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.urlApi}/inscripciones/estudiantes/${id_dicta}`)

  }

  asignarEstudiantes(
    materiaEstudiantes: { id_dicta: number; id_estudiante: number; fecha_inscripcion: string; anio: number }[]
  ): Observable<any> {
      return this.http.post(`${this.urlApi}`, materiaEstudiantes);
  }


  desAsignarEstudiante(id:number
  ): Observable<any> {
      return this.http.delete(`${this.urlApi}/${id}`);
  }

}

