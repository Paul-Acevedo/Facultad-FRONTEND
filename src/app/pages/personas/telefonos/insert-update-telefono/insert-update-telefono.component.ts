import { Component } from '@angular/core';
import { PackageTelefonoService } from '../package-telefono.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { PackageTipoTelefonoService } from '../../tipo-telefono/package-tipo-telefono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert-update-telefono',
  templateUrl: './insert-update-telefono.component.html',
  styleUrls: ['./insert-update-telefono.component.css'],
})
export class InsertUpdateTelefonoComponent {
  constructor(
    public _service: PackageTelefonoService,
    public dialogref: MatDialogRef<InsertUpdateTelefonoComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public tipo_telefono: PackageTipoTelefonoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tipo_telefono.mostrar();
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

  guardar() {
    if (this._service.register.valid) {
      if (!this._service.register.get('COD_TELEFONO')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          COD_TIPO_TELEFONO: datos.COD_TIPO_TELEFONO,
          CODIGO_DE_AREA: datos.CODIGO_DE_AREA,
          COD_PERSONA: this._service.id,
          TELEFONO: datos.TELEFONO,
          EXTENCION: datos.EXTENCION,
          DESCRIPCION_TELEFONO: datos.DESCRIPCION_TELEFONO,
        };

        this._service.crear(params).subscribe((resp) => {
          console.log(resp);
          if (!resp.ok) {
            this._sweet.mensajeSimple(
              'Ocurrio un error',
              'TELEFONO',
              'warning'
            );
          } else {
            this._sweet.mensajeSimple(
              'creado correctamente',
              'TELEFONO',
              'success'
            );
            let params = {
              operacion: 'INSERTO',
              fecha: new Date(),
              idusuario: localStorage.getItem('user'),
              tabla: 'TELEFONO',
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
          id: datos.COD_TELEFONO,
          COD_TIPO_TELEFONO: datos.COD_TIPO_TELEFONO,
          CODIGO_DE_AREA: datos.CODIGO_DE_AREA,
          COD_PERSONA: datos.COD_PERSONA,
          TELEFONO: datos.TELEFONO,
          EXTENCION: datos.EXTENCION,
          DESCRIPCION_TELEFONO: datos.DESCRIPCION_TELEFONO,
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if (!resp.ok) {
            this._sweet.mensajeSimple(
              'Ocurrio un error',
              'TELEFONO',
              'warning'
            );
          } else {
            this._sweet.mensajeSimple(
              'Actualizado correctamente',
              'TELEFONO',
              'success'
            );
            let params = {
              operacion: 'ACTUALIZO',
              fecha: new Date(),
              idusuario: localStorage.getItem('user'),
              tabla: 'TELEFONO',
            };
            this._bitacora.crear(params).subscribe();
          }
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }
}
