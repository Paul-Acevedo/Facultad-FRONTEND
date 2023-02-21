import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { DireccionComponent } from './direccion/direccion.component';
import { TipoDireccionComponent } from './tipo-direccion/tipo-direccion.component';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { TipoNaturalezaComponent } from './tipo-naturaleza/tipo-naturaleza.component';
import { TipoPersonaComponent } from './tipo-persona/tipo-persona.component';

const routes: Routes = [
  {
    path:'personas',component:PersonasComponent
  },
  {
    path:'telefonos/:id',component:TelefonosComponent
  },
  {
    path:'direccion/:id', component:DireccionComponent
  },
  {
    path:'tipo-telefono', component:TipoTelefonoComponent
  },
  
  {
    path:'tipo-direccion', component:TipoDireccionComponent
  },
  {
    path:'tipo-naturaleza', component:TipoNaturalezaComponent
  },
  {
    path:'tipo-persona', component:TipoPersonaComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
