import { Injectable } from '@angular/core';
import {Material} from '../interfaces/material'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Paralelo} from '../interfaces/paralelo'
import {environment} from "@envs/environment"

@Injectable({
  providedIn: 'root'

})
export class ParaleloService {
  urlApi:string=`${environment.API_URL}/paralelo`

  constructor(private readonly http: HttpClient) { }

  obtenerParaleloPorNombre(nombreParalelo: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}?nombre=${nombreParalelo}`);
  }

  getParalelo():Observable<Paralelo[]>{
    return this.http.get<Paralelo[]>(this.urlApi);
  }
}
