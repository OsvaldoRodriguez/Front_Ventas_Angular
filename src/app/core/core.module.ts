import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PeticionInterceptor } from '../interceptors/peticion.interceptor';
import { CategoriaService } from './services/categoria.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers : [
    AuthService,
    {
      // para habilitar el interceptor
      provide : HTTP_INTERCEPTORS,
      useClass : PeticionInterceptor,
      multi : true
    },
    CategoriaService // hay que importar un provider
  ]
})
export class CoreModule { }
