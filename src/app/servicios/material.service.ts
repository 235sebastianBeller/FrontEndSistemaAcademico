import { Injectable } from '@angular/core';
import {Material} from '../interfaces/material'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  materiales:Material[]=[]
  urlApi:string=`${environment.API_URL}/material`
  constructor(private readonly http: HttpClient) { }
  getMateriales():Material[]{
    return this.materiales;
  }
  encontrarMaterial(id?:number):Observable<Material> {
    return this.http.get<Material>(`${this.urlApi}/${id}`);
  }
  getMaterialesDeUnidad(id?:number):Observable<Material[]> {
    return this.http.get<Material[]>(`${this.urlApi}/unidad/${id}`);
  }
  guardadMaterial(material:Material):Observable<number> {
    return this.http.post<Material>(`${this.urlApi}`, material)
    .pipe(
      map((response: Material) => response.id_material || 1)
    );
  }

  actualizarMaterial(id: number, material: Material): Observable<Material> {
    if (!id) {
      throw new Error('El ID del material es requerido para la actualización');
    }
    return this.http.patch<Material>(`${this.urlApi}/${id}`, material);
  }

  eliminarMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

}
