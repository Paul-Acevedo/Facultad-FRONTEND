import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recu-correo',
  templateUrl: './recu-correo.component.html',
  styleUrls: ['./recu-correo.component.css']
})
export class RecuCorreoComponent implements OnInit {

  preguntasForm:FormGroup;
  constructor(
    private _service: GlobalService,
    private _sweet: SweetAlertService,
    private _router:Router
  ) { 
    this.preguntasForm = new FormGroup({
      correo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  guardar(){
    if(this.preguntasForm.valid){
      
      let params = {
        correo:this.preguntasForm.value.correo,
      }

      this._service.recuperacionCorreo(params).subscribe((data)=>{
        if(data.ok){
          this._sweet.mensajeSimple('Se ha enviado un correo electronico','Recuperación de contraseña','success');
        }else{
          this._sweet.mensajeSimple('El usuario no existe','Recuperación de contraseña','info'); 
        }
      })

    }else{
      this._sweet.mensajeSimple('Todos los campos son obligatorios', 'Recuperación correo electronico', 'error');
    }

  }
}
