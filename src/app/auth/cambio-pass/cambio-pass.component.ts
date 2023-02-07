import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit {

  public cambioForm: FormGroup;
  public hide: boolean = true;

  constructor(
    private _service: GlobalService,
    private _sweet: SweetAlertService,
    private _router:Router
  ) { 
    this.cambioForm = new FormGroup({
      contra: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
      repitecontra: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    if(this.cambioForm.valid){
      if(this.cambioForm.value.contra == this.cambioForm.value.repitecontra){
        let params = {
          pass:this.cambioForm.value.contra,
          id:JSON.parse(localStorage.getItem('user'))
        }
        this._service.cambiopass(params).subscribe(resp=>{
        this._sweet.mensajeSimple('Contraseña actualizada correctamente','Cambio','success');
        localStorage.clear();
        this._router.navigate(['/inicio']);
        });
      }else{
        this._sweet.mensajeSimple('Las contraseñas no coinciden','Cambio','error')
      }
    }else{
      this._sweet.mensajeSimple('Todos los campos son obligatorios','Cambio','error')
    }
  }

}
