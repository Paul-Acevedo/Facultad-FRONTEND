import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosInsertUpdateComponent } from './usuarios/usuarios-insert-update/usuarios-insert-update.component';
import { PermisosComponent } from './permisos/permisos.component';
import { PermisosInsertUpdateComponent } from './permisos/permisos-insert-update/permisos-insert-update.component';
import { ObjetosComponent } from './objetos/objetos.component';
import { ObjetosInsertUpdateComponent } from './objetos/objetos-insert-update/objetos-insert-update.component';
import { RolesComponent } from './roles/roles.component';
import { RolesInsertUpdateComponent } from './roles/roles-insert-update/roles-insert-update.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { PreguntasInsertUpdateComponent } from './preguntas/preguntas-insert-update/preguntas-insert-update.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ParametrosComponent } from './parametros/parametros.component';
import { ParametrosInsertUpdateComponent } from './parametros/parametros-insert-update/parametros-insert-update.component';
import { BackupComponent } from './backup/backup.component';
import { RestoreComponent } from './restore/restore.component';
import { PersonaComponent } from './usuarios/persona/persona.component';

@NgModule({
  declarations: [UsuariosComponent, UsuariosInsertUpdateComponent,
     PermisosComponent, PermisosInsertUpdateComponent, ObjetosComponent, ObjetosInsertUpdateComponent, RolesComponent, RolesInsertUpdateComponent, BitacoraComponent, PreguntasComponent, PreguntasInsertUpdateComponent, ParametrosComponent, ParametrosInsertUpdateComponent, BackupComponent, RestoreComponent, PersonaComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SeguridadModule { }
