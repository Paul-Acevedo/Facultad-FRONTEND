import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { TipoClientesComponent } from './tipo-clientes/tipo-clientes.component';
import { DetalleventasComponent } from './ventas/detalleventas/detalleventas.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {
    path:'ventas',component:VentasComponent
  },
  {
    path:'clientes',component:ClientesComponent
  },
  {
    path:'detallesventas',component:DetalleventasComponent
  },
  {
    path:'tipoclientes',component:TipoClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
