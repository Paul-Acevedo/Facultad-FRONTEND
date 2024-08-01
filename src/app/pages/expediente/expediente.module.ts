import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpedienteRoutingModule } from './expediente-routing.module';
import { ExpedienteComponent } from './expediente/expediente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { CitaComponent } from './cita/cita.component';

import {MatRadioModule} from '@angular/material/radio';
import { ProcesoComponent } from './proceso/proceso.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    ExpedienteComponent,
    CitaComponent,
    ProcesoComponent,
    
  ],
  imports: [
    CommonModule,
    ExpedienteRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDocViewerModule,
    MatRadioModule,
    MatProgressBarModule
  ]
})
export class ExpedienteModule { }
