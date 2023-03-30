import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    // este componente es el layout (solo es como una plantilla)
    path : '',
    component : LayoutComponent,
    // tiene componentes hijos
    children : [
      {
        // cargando un component
        path : '',
        component : InicioComponent
      },
      {
        // se esta cargando todo un módulo (conocido como lazy loading angular)
        path : 'auth',
        // este modulo va a tener sus rutas
        loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]

  },
  // para el admin -> (no se asigna layout, porque va a tener su propio diseño)
  {
    path : 'admin',
    loadChildren : () => import('./admin/admin.module').then( m => m.AdminModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
