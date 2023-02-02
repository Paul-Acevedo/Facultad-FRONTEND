import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide: boolean = false;
  registerForm: FormGroup;

  constructor(private service: GlobalService,
    private _sweet: SweetAlertService,
    private _router:Router) {
    this.registerForm = new FormGroup({
      COD_PERSONA: new FormControl(null),
      PRIMER_NOMBRE: new FormControl('', Validators.required),
      SEGUNDO_NOMBRE: new FormControl(''),
      PRIMER_APELLIDO: new FormControl('', Validators.required),
      SEGUNDO_APELLIDO: new FormControl(''),
      DNI: new FormControl('', Validators.required),
      FEC_NACIMIENTO: new FormControl('', Validators.required),
      EST_CIVIL: new FormControl('', Validators.required),
      SEXO: new FormControl('', Validators.required),
      TELEFONO: new FormControl('', Validators.required),
      DIREECION: new FormControl('', Validators.required),
      USUARIO: new FormControl('', Validators.required),
      EMAIL: new FormControl('', [Validators.required, Validators.email]),
      CONTRASEÑA: new FormControl('', [Validators.required, Validators.min(8)]),
      repitepass: new FormControl('', [Validators.required, Validators.min(8)])
    });
  }

  get validateOpinion() {
    return this.registerForm.controls;
  }

  guardar() {
    if (this.registerForm.valid) {

      if (this.registerForm.value.CONTRASEÑA == this.registerForm.value.repitepass) {
        let params = {
          PRIMER_NOMBRE: this.registerForm.value.PRIMER_NOMBRE,
          SEGUNDO_NOMBRE: this.registerForm.value.SEGUNDO_NOMBRE || '',
          PRIMER_APELLIDO: this.registerForm.value.PRIMER_APELLIDO,
          SEGUNDO_APELLIDO: this.registerForm.value.SEGUNDO_APELLIDO || '',
          DNI: this.registerForm.value.DNI,
          FEC_NACIMIENTO: this.registerForm.value.FEC_NACIMIENTO,
          EST_CIVIL: this.registerForm.value.EST_CIVIL,
          SEXO: this.registerForm.value.SEXO,
          TELEFONO: this.registerForm.value.TELEFONO,
          DIREECION: this.registerForm.value.DIREECION,
          USUARIO: this.registerForm.value.USUARIO,
          EMAIL: this.registerForm.value.EMAIL,
          CONTRASEÑA: this.registerForm.value.CONTRASEÑA
        }

        this.service.crearUserPers(params).subscribe(resp => {
          this._sweet.mensajeSimple('Registro', 'Registrado correctamente', 'success');
          this._router.navigate(['/inicio']);
        })
      } else {
        this._sweet.mensajeSimple('Registro', 'Las contraseñas no coinciden', 'warning');
      }

    } else {
      this._sweet.mensajeSimple('Registro', 'Todos los campos son obligatorios', 'warning');
    }

  }
}
