import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { DetalleComponent } from './solicitud/detalle/detalle.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { InsertUpdateCalendarioComponent } from './calendario/insert-update-calendario/insert-update-calendario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DocumentComponent } from './document/document.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';


@NgModule({
  declarations: [
    SolicitudComponent,
    DetalleComponent,
    CalendarioComponent,
    InsertUpdateCalendarioComponent,
    DocumentComponent,
    EstudiantesComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class SolicitudesModule { }
