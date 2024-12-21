import { Injectable,inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject  } from 'rxjs';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = `${environment.API_URL}/auth/login`;
  private estudianteUrl  =`${environment.API_URL}/estudiante`;
  private userSubject = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) {}

  getHeadersForAuth(){
    let token = localStorage.getItem('authToken'); 
    let headers = new HttpHeaders({
        Authorization: `Bearer ${token}` 
    })
    return headers;
  }

  login(email: string, password: string): Observable<any> {

    return this.http.post(this.loginUrl, { email:email, password:password });
  }



  saveUserData(data: any): void {
    let user=data.usuario;
    localStorage.setItem('userId', user.id_usuario );
    localStorage.setItem('userType', user.tipo);
    localStorage.setItem('userProfilePic', user.foto || '');
    localStorage.setItem('authToken',data.access_token)



  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  getUserId(): number | 0 {
    return Number(localStorage.getItem('userId'));
  }
  getUserProfilePic(): string | null {
    return localStorage.getItem('userProfilePic');
  }

  obtenerFotoPerfil(id: number): Observable<any> {
    let headers=this.getHeadersForAuth();
    return this.http.get(`${this.estudianteUrl}/${id}`,{headers});
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userProfilePic');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {

    return !!localStorage.getItem('userId');
  }

  getUserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }
}


