import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PeticionInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // configurando la logica de una peticion
    // hay que capturar un token

    // ahora si recibimos con el token
    const token = localStorage.getItem('access_token'); // eso se generara con node

    // console.log("llegando a interceptores");

    let peticion = request.clone({
      // agregando la configuracion para cabecera
      // indicar todo lo que se quiera

      setHeaders: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token, // para todo tipo de archivo
      },
    });
    return next.handle(peticion).pipe(
      tap(
        () => {},
        (error: any) => {
          console.log('ERROR EN PETICION');
          // llega
          if (error instanceof HttpErrorResponse) {
            if (error.status !== 401) {
              return;
            } 
              // puede haber expirado el token
            localStorage.removeItem('access_token');
            this.router.navigate(['/auth/login']);
          
          }
        }
      )
    );
    //403, 401
  }
}
