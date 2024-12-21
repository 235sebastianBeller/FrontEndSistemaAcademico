import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../servicios/auth.service'; // Asumimos que tienes un AuthService que maneja la autenticación
import {MensajeService} from '../paginas/mensaje/mensaje.component';
import { inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private mensajeService:MensajeService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles']; 
    const userRole = this.authService.getUserType(); 

    if (expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.mensajeService.mostrarMensajeError("Error!!","Acceso no autorizado!!");
      this.authService.logout();
      return false;
    }
  }
}
