import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import{MateriaAsignadaDocente} from '../interfaces/materia-asignada-docente';
import {Estudiante} from '../interfaces/estudiante'
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class MateriasProfesorService {
  urlApi:string=`${environment.API_URL}/materia-asignada-profesor`
  constructor(private readonly http: HttpClient) {

  }
  materias: MateriaAsignadaDocente[] = [];
obtenerMaterias():Observable<MateriaAsignadaDocente[]>{
  return this.http.get<MateriaAsignadaDocente[]>(`${this.urlApi}/todas-las-materias`)

}
obtenerMateriasDeEstudiante(id:number):Observable<MateriaAsignadaDocente[]>{
  return this.http.get<MateriaAsignadaDocente[]>(`${this.urlApi}/todas-las-materias/${id}`)

}


obtenerMateriaAsignada(id:number):Observable<MateriaAsignadaDocente>{
  return this.http.get<MateriaAsignadaDocente>(`${this.urlApi}/${id}`)
}
obtenerEstudiantesMateriaAsignada(id:number):Observable<Estudiante[]>{
  return this.http.get<Estudiante[]>(`${this.urlApi}/estudiantes/${id}`)
}

agregarMateriaAsignada(materiaAsignada:MateriaAsignadaDocente):Observable<MateriaAsignadaDocente>{
  return this.http.post<MateriaAsignadaDocente>(`${this.urlApi}`,materiaAsignada)
}

eliminarMateriaAsignada(id_dicta:number):any{
  return this.http.delete<any>(`${this.urlApi}/${id_dicta}`)
}

}
