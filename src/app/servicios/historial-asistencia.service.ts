import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../interfaces/asistencia';
import { Profesor } from '../interfaces/profesor';
import { Materia } from '../interfaces/materia';
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';
import { map } from 'rxjs';
import { Inscripcion } from '../interfaces/Inscripcion';
import { Estudiante } from '../interfaces/estudiante';
import {environment} from "@envs/environment"
@Injectable({
  providedIn: 'root'
})
export class HistorialAsistenciaService {
  private readonly asistenciaUrl = `${environment.API_URL}/Asistencia`;
  private readonly profesorUrl = `${environment.API_URL}/Profesor`;
  private readonly materiasAsignadasUrl = `${environment.API_URL}/materia-asignada-profesor`;
  private readonly materiasUrl = `${environment.API_URL}/materias`;
  private readonly estudianteUrl = `${environment.API_URL}/estudiante`;
  private readonly InscripcionUrl = `${environment.API_URL}/inscripcion`;


  constructor(private readonly http: HttpClient) {}

  obtenerAsistencias(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.asistenciaUrl);
  }

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.profesorUrl);
  }

  obtenerMateriasAsignadas(): Observable<MateriaAsignadaDocente[]> {
    return this.http.get<MateriaAsignadaDocente[]>(this.materiasAsignadasUrl)
    ;
  }

  obtenerMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.materiasUrl);
  }

  obtenerAsistenciasPorEstudianteYMateria(id_estudiante: number, id_dicta: number): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${this.asistenciaUrl}/asistencias`).pipe(
      map(asistencias =>
        asistencias.filter(asistencia =>
          asistencia.estudiante?.id_estudiante === id_estudiante &&
          asistencia.materiaAsignada.id_dicta === id_dicta
        )
      )
    );
  }
  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.InscripcionUrl);
  }
  obtenerEstudaintes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.estudianteUrl);
    }
}
