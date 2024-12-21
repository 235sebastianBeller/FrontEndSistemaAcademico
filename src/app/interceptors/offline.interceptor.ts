import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import {MensajeService} from '../paginas/mensaje/mensaje.component';
import { inject } from '@angular/core';

export const offlineInterceptor: HttpInterceptorFn = (req, next) => {
  const mensajeService = inject(MensajeService);

  if (!navigator.onLine) {
   mensajeService.mostrarMensajeError("Error!!",'Parece que no tienes conexión a internet. Por favor, verifica y vuelve a intentar.');
    return throwError(() => new Error('Sin conexión a internet.'));
  }
  return next(req);
};

