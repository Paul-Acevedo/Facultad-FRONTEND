import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

const routes: Routes = [{
  path:'calendario',component:CalendarioComponent
},{
  path:'solicitud',component:SolicitudComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
