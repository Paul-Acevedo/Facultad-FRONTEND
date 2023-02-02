import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreguntasPackageService } from 'src/app/pages/seguridad/preguntas/preguntas-package.service';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-preguntas-seguridad',
  templateUrl: './preguntas-seguridad.component.html',
  styleUrls: ['./preguntas-seguridad.component.css']
})
export class PreguntasSeguridadComponent implements OnInit {


  public preguntasForm: FormGroup;

  constructor(private _service: GlobalService,
    private _sweet: SweetAlertService,
    private _router:Router,
    public pregutas:PreguntasPackageService) { 
    this.pregutas.mostrar();
    this.preguntasForm = new FormGroup({
      pregunta: new FormControl('', [Validators.required]),
      respuesta: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  guardar(){

    if(this.preguntasForm.valid){
      console.log(this.preguntasForm.value);

      let params = {
        pregunta:this.preguntasForm.value.pregunta,
        respuesta:this.preguntasForm.value.respuesta,
        usuario: JSON.parse(localStorage.getItem('user'))
      }

      this.pregutas.crearUser(params).subscribe((data)=>{
        this.preguntasForm.setValue({
          respuesta:'',
          pregunta:''
        })
        if(data.data[0].codigo == 1){
          this._router.navigate(['/contraseña']);
        }else{
          this._sweet.mensajeSimple(data.data[0].descripcion ,'Configuracion de preguntas','info');
        }
      })
    }else{
      this._sweet.mensajeSimple('Todos los campos son obligatorios', 'Preguntas', 'error');
    }
  
  }

}
