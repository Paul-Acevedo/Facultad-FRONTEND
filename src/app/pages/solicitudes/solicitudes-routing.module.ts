import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { DetalleComponent } from './solicitud/detalle/detalle.component';
import { DocumentComponent } from './document/document.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';

const routes: Routes = [{
  path:'calendario',component:CalendarioComponent
},{
  path:'solicitud',component:SolicitudComponent
},
{
  path:'detalle',component:DetalleComponent
},
{
  path:'documentos',component:DocumentComponent
},
{
  path:'estudiantes',component:EstudiantesComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
