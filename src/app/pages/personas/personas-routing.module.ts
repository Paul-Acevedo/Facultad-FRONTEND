import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { DireccionComponent } from './direccion/direccion.component';
import { TipoDireccionComponent } from './tipo-direccion/tipo-direccion.component';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';

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
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
