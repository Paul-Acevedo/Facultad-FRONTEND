import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public hide: boolean = true;

  constructor(private _service: GlobalService,
    private _sweet: SweetAlertService,
    private _router:Router){

    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
    });
  }

  get validateOpinion(){
    return this.loginForm.controls;
  }


  login() {

    if(!this.loginForm.valid){
      this._sweet.mensajeSimple('Por favor ingrese los datos correctamente','','error');
    }else{
      this._service.login(this.loginForm.value).subscribe(data => {
        console.log(data)

        if(data.ok){
          console.log(data.data.ESTADO);
          if(data.data.ESTADO == 'Nuevo'){
            localStorage.setItem("token",JSON.stringify(data.token));
            localStorage.setItem("user",JSON.stringify(data.data.COD_USUARIO));
            this._router.navigate(['/preguntas']);
          }else{
            
            localStorage.setItem("user",data.data.COD_USUARIO);
            localStorage.setItem("rol",data.data.COD_ROL);
            localStorage.setItem("token",JSON.stringify(data.token));
            this._router.navigate(['/dashboard']);
          }
          }else{
          this._sweet.mensajeSimple(data.msg,'', 'error');
          }  
    });
    }

   
  }
}
