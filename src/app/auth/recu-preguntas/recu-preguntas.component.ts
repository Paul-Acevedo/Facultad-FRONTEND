import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreguntasPackageService } from 'src/app/pages/seguridad/preguntas/preguntas-package.service';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-recu-preguntas',
  templateUrl: './recu-preguntas.component.html',
  styleUrls: ['./recu-preguntas.component.css']
})
export class RecuPreguntasComponent implements OnInit {

  preguntasForm:FormGroup;
  constructor(
    private _service: GlobalService,
    private _sweet: SweetAlertService,
    private _router:Router,
    public pregutas:PreguntasPackageService
  ) { 
    this.preguntasForm = new FormGroup({
      pregunta: new FormControl('', [Validators.required]),
      respuesta: new FormControl('', [Validators.required]),
      usuario: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.pregutas.mostrar();
  }

  guardar(){
    if(this.preguntasForm.valid){
      let params = {
        pregunta:this.preguntasForm.value.pregunta,
        respuesta:this.preguntasForm.value.respuesta,
        usuario:this.preguntasForm.value.usuario,
      }

      this.pregutas.recuPreguntas(params).subscribe((data)=>{
        if(data.data[0].codigo == 1){
          this._sweet.mensajeSimple('Datos incorrectos','Recuperación de contraseña','info');
         }else{
          console.log(data.data[0].COD_USUARIO);
          localStorage.setItem('user',data.data[0].COD_USUARIO)
          this._router.navigate(['/contraseña']);
        }
      })
    }else{
      this._sweet.mensajeSimple('Todos los campos son obligatorios', 'Recuperación Preguntas', 'error');
    }

  }

}
