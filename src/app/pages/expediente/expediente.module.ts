import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpedienteRoutingModule } from './expediente-routing.module';
import { ExpedienteComponent } from './expediente/expediente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';


@NgModule({
  declarations: [
    ExpedienteComponent,
    
  ],
  imports: [
    CommonModule,
    ExpedienteRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDocViewerModule
  ]
})
export class ExpedienteModule { }
