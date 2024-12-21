import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from "@envs/environment"

interface Estudiante {
  id_estudiante: number;
  nombre: string;
}

interface Datos {
  estudiante: Estudiante;
  trimestre: number;
  nota: number;
  tipo: string;
}

@Injectable({
  providedIn: 'root',
})
export class DetalleNotasEstudiantesService {
  private apiUrl = `${environment.API_URL}/nota`;

  constructor(private http: HttpClient) {}

  getNotasEstudiante(idEstudiante: number, idDicta: number): Observable<Datos[]> {
    return this.http.get<Datos[]>(`${this.apiUrl}?id_estudiante=${idEstudiante}&id_dicta=${idDicta}`);
  }

  getDatosAgrupados(idEstudiante: number, idDicta: number): Observable<any> {
    return this.getNotasEstudiante(idEstudiante, idDicta).pipe(
      map((data: Datos[]) => {
        const agrupadosPorTrimestre = data.reduce((acc, curr) => {
          const trimestre = curr.trimestre;
          if (!acc[trimestre]) {
            acc[trimestre] = { ser: 0, saber: 0, hacer: 0, decidir: 0, total: 0 };
          }

          if (curr.tipo === 'ser') acc[trimestre].ser = curr.nota;
          if (curr.tipo === 'saber') acc[trimestre].saber = curr.nota;
          if (curr.tipo === 'hacer') acc[trimestre].hacer = curr.nota;
          if (curr.tipo === 'decidir') acc[trimestre].decidir = curr.nota;

          acc[trimestre].total =
            acc[trimestre].ser +
            acc[trimestre].saber +
            acc[trimestre].hacer +
            acc[trimestre].decidir;

          return acc;
        }, {} as { [trimestre: number]: { ser: number, saber: number, hacer: number, decidir: number, total: number }});

        return agrupadosPorTrimestre;
      })
    );
  }
}

