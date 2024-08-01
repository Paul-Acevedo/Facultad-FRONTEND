import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpedienteComponent } from './expediente/expediente.component';
import { ProcesoComponent } from './proceso/proceso.component';

const routes: Routes = [
  {
    path:'expediente',component:ExpedienteComponent
  },
  {
    path:'proceso',component:ProcesoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedienteRoutingModule { }
