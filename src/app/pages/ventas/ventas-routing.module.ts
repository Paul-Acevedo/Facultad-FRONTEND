import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
