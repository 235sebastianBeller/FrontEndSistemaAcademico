import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MensajeService} from '../paginas/mensaje/mensaje.component';
import { AuthService } from '../servicios/auth.service'; 


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); 
  const authToken = localStorage.getItem('authToken');
  const mensajeService = inject(MensajeService);
  const authService = inject(AuthService);

  const clonedRequest = authToken
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) })
    : req;

  return next(clonedRequest).pipe( 
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/']);
        mensajeService.mostrarMensajeError("Error!!","Debe identificarse previamente!!!");
        authService.logout();


      }
      if (error.status === 403) {

        router.navigate(['/']);
        mensajeService.mostrarMensajeError("Error!!","Acceso no autorizado!!");
        authService.logout();

      }
      return throwError(() => error);
    })
  );
  
};
