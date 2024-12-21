import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Materia} from '../interfaces/materia';
import {environment} from "@envs/environment";
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  urlApi:string=`${environment.API_URL}/materias`
  constructor(private readonly http: HttpClient) {
  }
  getMaterias():Observable<Materia[]>{
    return this.http.get<Materia[]>(this.urlApi);
  }
  postMateria(materia:any):Observable<Materia>{
    return this.http.post<Materia>(this.urlApi,materia);
  }
}