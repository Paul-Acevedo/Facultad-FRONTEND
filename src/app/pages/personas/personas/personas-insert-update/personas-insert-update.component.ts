import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PersonasPackageService } from '../personas-package.service';

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
  ) {
 
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

    console.log(this._service.register.valid);
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
          console.log(resp);
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

        };
        this._service.actualizar(params).subscribe((resp: any) => {
          console.log(resp);
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
