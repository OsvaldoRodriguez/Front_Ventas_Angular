import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { PasswordModule } from "primeng/password"
import { ButtonModule } from "primeng/button"

@NgModule({
  // aqui se declara los componentes
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  // aqui se importan los modulos
  imports: [
    CommonModule,
    AuthRoutingModule,
    // importando modulos reactivos
    ReactiveFormsModule,
    // HttpClientModule,
    // es importante
    CoreModule,
    PasswordModule,
    ButtonModule
  ],
})
export class AuthModule { }
