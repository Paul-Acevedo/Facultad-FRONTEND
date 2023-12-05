import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas/personas.component';
import { PersonasInsertUpdateComponent } from './personas/personas-insert-update/personas-insert-update.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { DireccionComponent } from './direccion/direccion.component';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { TipoDireccionComponent } from './tipo-direccion/tipo-direccion.component';
import { InsertUpdateComponent } from './tipo-direccion/insert-update/insert-update.component';
import { InsertUpdateComponent as di } from './direccion/insert-update/insert-update.component';
import { InsertUpdateComponent  as telefono} from './tipo-telefono/insert-update/insert-update.component';
import { InsertUpdateTelefonoComponent } from './telefonos/insert-update-telefono/insert-update-telefono.component';




@NgModule({
  declarations: [di,PersonasComponent, PersonasInsertUpdateComponent, TelefonosComponent, DireccionComponent, TipoTelefonoComponent, TipoDireccionComponent, InsertUpdateComponent,telefono, InsertUpdateTelefonoComponent],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonasModule { }
