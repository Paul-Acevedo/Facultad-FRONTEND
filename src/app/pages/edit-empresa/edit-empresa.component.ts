import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { GlobalService } from 'src/app/services/global.service';
import { PackageEmpresaService } from '../seguridad/empresa/package-empresa.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css'],
})
export class EditEmpresaComponent {
  usuario: any = [];
  empresa: any = [];
  form: FormGroup;
  formpass: FormGroup;
  formempresa: FormGroup;
  formcai: FormGroup;
  datoscai: any = [];
  datoscaiselect: any = [];

  constructor(
    private global: GlobalService,
    public _empresa: PackageEmpresaService,
    private _sweet: SweetAlertService
  ) {
    this.global.mostrarusuario().subscribe((resp) => {
      this.usuario = resp[0];
      this.form.patchValue(this.usuario);
    });

    this.formcai = new FormGroup({
      CAI: new FormControl(''),
      FECHA_INICIO: new FormControl(''),
      FECHA_FIN: new FormControl(''),
      RANGO_DESDE: new FormControl(''),
      RANGO_HASTA: new FormControl(''),
      FACTURA_SAR: new FormControl(''),
      COD_CAI: new FormControl('', Validators.required),
    });

    this.formcai.get('CAI').disable();
    this.formcai.get('FECHA_INICIO').disable();
    this.formcai.get('FECHA_FIN').disable();
    this.formcai.get('RANGO_DESDE').disable();
    this.formcai.get('RANGO_HASTA').disable();
    this.formcai.get('FACTURA_SAR').disable();

    this.form = new FormGroup({
      PRIMER_NOMBRE: new FormControl(
        this.usuario.PRIMER_NOMBRE,
        Validators.required
      ),
      SEGUNDO_NOMBRE: new FormControl(
        this.usuario.SEGUNDO_NOMBRE,
        Validators.required
      ),
      PRIMER_APELLIDO: new FormControl(
        this.usuario.PRIMER_APELLIDO,
        Validators.required
      ),
      SEGUNDO_APELLIDO: new FormControl(
        this.usuario.SEGUNDO_APELLIDO,
        Validators.required
      ),
      DNI: new FormControl(this.usuario.DNI, Validators.required),
    });

    this.formpass = new FormGroup({
      pass: new FormControl('', Validators.required),
      newpass: new FormControl('', Validators.required),
      repeatpass: new FormControl('', Validators.required),
    });

    this.formempresa = new FormGroup({
      COD_EMPRESA: new FormControl(null),
      NOMBRE_EMPRESA: new FormControl(
        this.empresa.NOMBRE_EMPRESA,
        Validators.required
      ),
      DIRECCION: new FormControl(this.empresa.DIRECCION, Validators.required),
      TELEFONO: new FormControl(this.empresa.TELEFONO, Validators.required),
      CORREO: new FormControl(this.empresa.CORREO, Validators.required),
      RTN: new FormControl(this.empresa.RTN, Validators.required),
    });

    this._empresa.mostrar();
    this._empresa.response$.subscribe((resp) => {
      this.formempresa.patchValue(resp[0]);
    });

    this.global.obtener('caiestado').subscribe((resp) => {
      this.datoscaiselect = resp;
      this.formcai.patchValue(resp[0]);
    });

    this.global.obtener('cai').subscribe((resp) => {
      this.datoscai = resp;
    });

    this.formcai.get('COD_CAI').valueChanges.subscribe((r) => {
      this.global.obtener(`cai/${r}`).subscribe((resp) => {

        // this.datoscaiselect = resp;
        this.formcai.patchValue({
          CAI: resp[0].CAI,
          FECHA_INICIO: resp[0].FECHA_INICIO,
          FECHA_FIN: resp[0].FECHA_FIN,
          RANGO_DESDE: resp[0].RANGO_DESDE,
          RANGO_HASTA: resp[0].RANGO_HASTA,
          FACTURA_SAR: resp[0].FACTURA_SAR,
        });
      });
    });
  }

  change() {
    if (this.formpass.value.newpass != this.formpass.value.repeatpass) {
      Notiflix.Notify.failure('Las contraseñas no coinciden');
    } else {
      let params = {
        id: this.usuario.COD_USUARIO,
        newpass: this.formpass.value.newpass,
        pass: this.formpass.value.pass,
      };
      this.global.updatepassuser(params).subscribe((resp) => {
        if (resp.ok) {
          Notiflix.Notify.success(resp.data);
        } else {
          Notiflix.Notify.failure(resp.data);
        }
      });
    }
  }

  ngAfterContentInit(): void {}

  guardar() {
    let params = {
      primern: this.form.value.PRIMER_NOMBRE,
      segudon: this.form.value.SEGUNDO_NOMBRE,
      primera: this.form.value.PRIMER_APELLIDO,
      segundoa: this.form.value.SEGUNDO_APELLIDO,
      dni: this.form.value.DNI,
      id: this.usuario.COD_PERSONA,
    };

    this.global.updatePerfil(params).subscribe((resp) => {
      if (resp.ok) {
        Notiflix.Notify.success(resp.data);
      } else {
        Notiflix.Notify.failure(resp.data);
      }
    });
  }

  guardarempresa() {
    let params = {
      NOMBRE_EMPRESA: this.formempresa.value.NOMBRE_EMPRESA,
      DIRECCION: this.formempresa.value.DIRECCION,
      TELEFONO: this.formempresa.value.TELEFONO,
      CORREO: this.formempresa.value.CORREO,
      RTN: this.formempresa.value.RTN,
      id: this.formempresa.value.COD_EMPRESA,
    };

    this._empresa.actualizar(params).subscribe((resp) => {
      if (resp.ok) {
        Notiflix.Notify.success('Actualizado correctamente!');
      } else {
        Notiflix.Notify.failure(resp.data);
      }
    });
  }

  guardarcai() {
    Notiflix.Confirm.show(
      'Confirmar',
      '¿Desea cambiar el CAI?',
      'Si',
      'No',
      () => {
        let params = {
          id: this.formcai.get('COD_CAI').value,
        };

        this._empresa.actualizarcai('caiselector', params).subscribe((resp) => {
          if (resp.ok) {
            Notiflix.Notify.success('Actualizado correctamente!');
          } else {
            Notiflix.Notify.failure(resp.data);
          }
        });
      }
    );
  }
}
