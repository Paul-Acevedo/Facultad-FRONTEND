import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PersonasPackageService } from 'src/app/pages/personas/personas/personas-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from '../../bitacora/bitacora-package.service';
import { RolesPackageService } from '../../roles/roles-package.service';
import { UsuariosPackageService } from '../usuarios-package.service';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PersonaComponent } from '../persona/persona.component';
@Component({
  selector: 'app-usuarios-insert-update',
  templateUrl: './usuarios-insert-update.component.html',
  styleUrls: ['./usuarios-insert-update.component.css'],
})
export class UsuariosInsertUpdateComponent implements OnInit {
  hide: boolean = false;
  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;
  options: any[] = [];
  filteredPersonas: Observable<any[]>;
  filteredRoles: Observable<any[]>;
  nombreproducto: string;
  optionsarticulo: any[] = [];
  filteredArticulos: Observable<any[]>;

  nombre:string;

  constructor(
    public _service: UsuariosPackageService,
    public dialogref: MatDialogRef<UsuariosInsertUpdateComponent>,
    private _dialog: MatDialog,
    public _roles: RolesPackageService,
    public _persona: PersonasPackageService,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService
  ) {
    this._roles.mostrar();
  }

  ngOnInit(): void {
  
  }




  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  //cerrarmodal
  cerrarmodal() {
    this.dialogref.close();
  }
  get validateOpinion() {
    return this._service.register.controls;
  }

  eventpersona() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(PersonaComponent);
  }

  guardar() {
    if (this._service.register.valid) {
      if (!this._service.register.get('COD_USUARIO')?.value) {
        // crea usuario
        let datos = this._service.register.value;
        if (datos.CONTRASEÑA == datos.repitepass) {
          let params = {
            idpersona: datos.COD_PERSONA,
            rol: datos.COD_ROL,
            usuario: datos.USUARIO,
            correo: datos.EMAIL,
            estado: 'Nuevo',
          };

          this._service.crear(params).subscribe((resp) => {
            console.log(resp);
            if (!resp.ok) {
              this._sweet.mensajeSimple(resp.msg, 'USUARIOS', 'warning');
            } else {
              this._sweet.mensajeSimple(
                'Creado correctamente',
                'USUARIOS',
                'success'
              );
              let params = {
                operacion: 'INSERTO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'USUARIOS',
              };
              this._bitacora.crear(params).subscribe();
              this._service.mostrar();
            }
          })

          this.cerrarmodal();
        } else {
          this._sweet.mensajeSimple(
            'Las contraseñas no coinciden!',
            'USUARIOS',
            'warning'
          );
        }
      } else {
        // actualiza ususario
        let datos = this._service.register.value;

        let params = {
          id: datos.COD_USUARIO,
          idpersona: datos.COD_PERSONA,
          rol: datos.COD_ROL,
          usuario: datos.USUARIO,
          correo: datos.EMAIL,
          estado: datos.ESTADO,
        };

        this._service.actualizar(params).subscribe((resp: any) => {
          this._sweet.mensajeSimple(
            'Actualizado correctamente',
            'USUARIOS',
            'success'
          )
          let params = {
            operacion: 'INSERTO',
            fecha: new Date(),
            idusuario: localStorage.getItem('user'),
            tabla: 'USUARIOS',
          };
          this._bitacora.crear(params).subscribe();

          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }
}
