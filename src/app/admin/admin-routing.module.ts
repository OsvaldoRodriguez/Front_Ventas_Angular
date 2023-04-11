import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { CategoriaComponent } from './components/categoria/categoria.component';

const routes: Routes = [
  // para admin
  {
    // para cargar el dashboard
    path : '',
    component : AppLayoutComponent,
    children : [
      { // para que aparezce en perfil mas
        path : 'perfil',
        component : PerfilComponent
      },
      {
        path : 'categoria',
        component : CategoriaComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
