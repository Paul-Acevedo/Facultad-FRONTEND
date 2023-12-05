import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ObjetosComponent } from './objetos/objetos.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { PermisosComponent } from './permisos/permisos.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { RestoreComponent } from './restore/restore.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'usuarios',component: UsuariosComponent,
  },
  {
    path: 'roles',component: RolesComponent,
  },
  {
    path: 'bitacora',component: BitacoraComponent,
  },
  {
    path: 'permisos',component: PermisosComponent,
  },
  {
    path: 'preguntas',component: PreguntasComponent,
  },
  {
    path: 'objetos',component: ObjetosComponent,
  },
  {
    path: 'parametros',component: ParametrosComponent,
  },
  {
    path: 'backup',component: BackupComponent,
  },
  {
    path: 'restore',component: RestoreComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
