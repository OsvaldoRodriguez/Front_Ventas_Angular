import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ListaPedidoComponent } from './components/pedido/lista-pedido/lista-pedido.component';
import { NuevoPedidoComponent } from './components/pedido/nuevo-pedido/nuevo-pedido.component';
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
      }, 
      {
        path : 'producto',
        component : ProductoComponent
      },
      {
        path: 'pedido',
        component: ListaPedidoComponent
      },
      {
        path: 'pedido/nuevo',
        component: NuevoPedidoComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
