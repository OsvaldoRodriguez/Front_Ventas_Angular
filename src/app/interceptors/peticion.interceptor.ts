import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeticionInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // configurando la logica de una peticion
    // hay que capturar un token

    const token = "ABC.XYZ.123"; // eso se generara con node
    console.log("llegando a interceptores");
    
    let peticion = request.clone({
      // agregando la configuracion para cabecera
      // indicar todo lo que se quiera

      setHeaders : {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + token , // para todo tipo de archivo 
      }
    });
    return next.handle(peticion);
  }
}
