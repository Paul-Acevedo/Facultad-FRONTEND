import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas/personas.component';
import { PersonasInsertUpdateComponent } from './personas/personas-insert-update/personas-insert-update.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PersonasComponent, PersonasInsertUpdateComponent],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonasModule { }
