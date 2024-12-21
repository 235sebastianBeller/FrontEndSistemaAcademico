import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MensajeService} from '../paginas/mensaje/mensaje.component';
import { inject } from '@angular/core';



export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const mensajeService = inject(MensajeService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          mensajeService.mostrarMensajeError("Error!!","Ocurrio un error, vuelva a intentarlo mas tarde")
          break;
        case 500:
          mensajeService.mostrarMensajeError("Error!!","Ocurrio un error, vuelva a intentarlo mas tarde.")
          break;
        // case 400:
        //   alert('Solicitud incorrecta. Verifica los datos ingresados.');
        //   break;
        // case 502:
        //   alert('Problema con el servidor intermedio. Intenta nuevamente.');
        //   break;

      }
      return throwError(() => error);
    })
  );
};
