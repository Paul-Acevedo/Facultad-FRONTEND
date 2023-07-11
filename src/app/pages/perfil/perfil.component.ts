import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { GlobalService } from 'src/app/services/global.service';
import { PackageEmpresaService } from '../seguridad/empresa/package-empresa.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  usuario: any = [];
  public hide: boolean = true;

  empresa: any = [];

  form: FormGroup;
  formpass: FormGroup;
  formempresa: FormGroup;

  constructor(
    private global: GlobalService,
    private _empresa: PackageEmpresaService
  ) {

    this.global.mostrarusuario().subscribe((resp) => {
      this.usuario = resp[0];
      this.form.patchValue(this.usuario);
    });

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
      pass: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
      newpass: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
      repeatpass: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
    });

    this.formempresa = new FormGroup({
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
        console.log(resp);
        if (resp.ok) {
          Notiflix.Notify.success(resp.data);
        } else {
          Notiflix.Notify.failure(resp.data);
        }
      });
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form.get('PRIMER_NOMBRE').disable();
    this.form.get('SEGUNDO_NOMBRE').disable();
    this.form.get('PRIMER_APELLIDO').disable();
    this.form.get('SEGUNDO_APELLIDO').disable();
    this.form.get('DNI').disable();

  }
  ngAfterContentInit(): void { }

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
    console.log(params);
  }

}
