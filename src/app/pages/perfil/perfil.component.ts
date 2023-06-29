import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  usuario: any = [];

  form: FormGroup;
  formpass: FormGroup;

  constructor(private global: GlobalService) {
    this.global.mostrarusuario().subscribe((resp) => {
      console.log(resp);
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
      pass: new FormControl('', Validators.required),
      newpass: new FormControl('', Validators.required),
      repeatpass: new FormControl('', Validators.required),
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

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }

  guardar() {
    console.log(this.form.value);
  }
}
