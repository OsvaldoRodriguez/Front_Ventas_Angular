import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CoreModule } from '../core/core.module';
import { AppLayoutModule } from '../layout/app.layout.module';
import { CategoriaComponent } from './components/categoria/categoria.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog'
import {ButtonModule} from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import {ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PerfilComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
    
    // AppLayoutModule // importando el template se importo en la raiz app.module
  ]
})
export class AdminModule { }
