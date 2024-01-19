import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpedienteComponent } from './expediente/expediente.component';

const routes: Routes = [
  {
    path:'expediente',component:ExpedienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedienteRoutingModule { }
