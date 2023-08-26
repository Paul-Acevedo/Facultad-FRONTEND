import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PersonasPackageService } from '../personas-package.service';
import { PackageTipoNaturalezaService } from '../../tipo-naturaleza/package-tipo-naturaleza.service';
import { PackageTipoPersonaService } from '../../tipo-persona/package-tipo-persona.service';

@Component({
  selector: 'app-personas-insert-update',
  templateUrl: './personas-insert-update.component.html',
  styleUrls: ['./personas-insert-update.component.css'],
})
export class PersonasInsertUpdateComponent implements OnInit {
  fecha: Date = new Date();

  constructor(
    public _service: PersonasPackageService,
    public dialogref: MatDialogRef<PersonasInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public _tiponaturaleza: PackageTipoNaturalezaService,
    public _tipopersona: PackageTipoPersonaService
  ) {
    this._tipopersona.mostrar();
    this._tiponaturaleza.mostrar();
    this._service.register
      .get('COD_TIPO_NATURALEZA')
      .valueChanges.subscribe((resp) => {
        if (resp == 2) {
          this._service.register.get('DNI').disable();
          this._service.register.get('PASAPORTE').disable();
        } else {
          this._service.register.get('DNI').enable();
          this._service.register.get('PASAPORTE').enable();
        }
      });
  }

  ngOnInit(): void {}

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

  guardar() {
    if (this._service.register.valid) {
      if (!this._service.register.get('COD_PERSONA')?.value) {
        let datos = this._service.register.value;
        let params = {
          pcodn: datos.COD_TIPO_PERSONA,
          pcodp: datos.COD_TIPO_NATURALEZA,
          primern: datos.PRIMER_NOMBRE,
          segudon: datos.SEGUNDO_NOMBRE || '',
          primera: datos.PRIMER_APELLIDO,
          segundoa: datos.SEGUNDO_APELLIDO || '',
          dni: datos.DNI || '',
          nacimiento: datos.FEC_NACIMIENTO,
          estado: datos.EST_CIVIL,
          sexo: datos.SEXO,
          pasaporte: datos.PASAPORTE || '',
        };

        this._service.crear(params).subscribe((resp) => {
          if (!resp.ok) {
            this._sweet.mensajeSimple(resp.msg, 'PERSONAS', 'warning');
          } else {
            this._sweet.mensajeSimple(
              'Creado correctamente',
              'PERSONAS',
              'success'
            );
            let params = {
              operacion: 'INSERTO',
              fecha: new Date(),
              idusuario: localStorage.getItem('user'),
              tabla: 'PERSONAS',
            };
            this._bitacora.crear(params).subscribe();
          }
          this._service.mostrar();
        });
        this.cerrarmodal();
      } else {
        // actualiza ususario
        let datos = this._service.register.value;

        let params = {
          id: datos.COD_PERSONA,
          pcodn: datos.COD_TIPO_NATURALEZA,
          pcodp: datos.COD_TIPO_PERSONA,
          primern: datos.PRIMER_NOMBRE,
          segudon: datos.SEGUNDO_NOMBRE || '',
          primera: datos.PRIMER_APELLIDO,
          segundoa: datos.SEGUNDO_APELLIDO || '',
          dni: datos.DNI,
          nacimiento: datos.FEC_NACIMIENTO,
          estado: datos.EST_CIVIL,
          sexo: datos.SEXO,
          //carnet: datos.CARNET_RESIDENCIA || '',
          pasaporte: datos.PASAPORTE || '',
          //permiso:datos.PERMISO_OPERACION || ''
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          this._sweet.mensajeSimple(
            'Actualizado correctamente',
            'PERSONAS',
            'success'
          );
          let params = {
            operacion: 'ACTUALIZO',
            fecha: new Date(),
            idusuario: localStorage.getItem('user'),
            tabla: 'PERSONAS',
          };
          this._bitacora.crear(params).subscribe();

          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }
}
