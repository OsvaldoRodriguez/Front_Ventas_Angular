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
import { ProductoComponent } from './components/producto/producto.component';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea'
@NgModule({
  declarations: [
    PerfilComponent,
    CategoriaComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule
    
    
    // AppLayoutModule // importando el template se importo en la raiz app.module
  ]
})
export class AdminModule { }
