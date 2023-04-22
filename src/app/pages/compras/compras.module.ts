import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasComponent } from './compras/compras.component';
import { ComprasInsertUpdateComponent } from './compras/compras-insert-update/compras-insert-update.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallescomprasComponent } from './detallescompras/detallescompras.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedoresInsertUpdateComponent } from './proveedores/proveedores-insert-update/proveedores-insert-update.component';
import { InsertUpdatePagoComponent } from './compras/insert-update-pago/insert-update-pago.component';


@NgModule({
  declarations: [ComprasComponent, ComprasInsertUpdateComponent,DetallescomprasComponent,ProveedoresComponent,ProveedoresInsertUpdateComponent,
  InsertUpdatePagoComponent],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComprasModule { }
