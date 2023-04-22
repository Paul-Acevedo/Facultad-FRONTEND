import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasInsertUpdateComponent } from './ventas/ventas-insert-update/ventas-insert-update.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleventasComponent } from './ventas/detalleventas/detalleventas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesInsertUpdateComponent } from './clientes/clientes-insert-update/clientes-insert-update.component';

import { InsertUpdatePagVentasComponent } from './ventas/insert-update-pago/insert-update-pago.component';


@NgModule({
  declarations: [ClientesComponent,ClientesInsertUpdateComponent,
                VentasComponent,VentasInsertUpdateComponent,DetalleventasComponent,InsertUpdatePagVentasComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
