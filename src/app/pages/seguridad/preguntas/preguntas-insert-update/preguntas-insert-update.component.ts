import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PreguntasPackageService } from '../preguntas-package.service';

@Component({
  selector: 'app-preguntas-insert-update',
  templateUrl: './preguntas-insert-update.component.html',
  styleUrls: ['./preguntas-insert-update.component.css']
})
export class PreguntasInsertUpdateComponent implements OnInit {

  constructor(public _service: PreguntasPackageService,
    public dialogref: MatDialogRef<PreguntasInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: GlobalService
  ) { }

  ngOnInit(): void {
  }

  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  get validateOpinion(){
    return this._service.register.controls;
  }
  

  //cerrarmodal
  cerrarmodal() {
    this.dialogref.close();
  }

  guardar() {


    if (this._service.register.valid) {

      if (!this._service.register.get('COD_PREGUNTA')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          pregunta: datos.PREGUNTA,
          estado: datos.ESTADO
        };

        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'PREGUNTAS','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'PREGUNTAS', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:1,
              tabla:'PREGUNATAS',
            }
            this._bitacora.crear(params).subscribe();
          }
          this._service.mostrar();
        });
        this.cerrarmodal();
      } else {
        // actualiza ususario
        let datos = this._service.register.value;

        let params = {
          id: datos.COD_PREGUNTA,
          pregunta: datos.PREGUNTA,
          estado: datos.ESTADO
        };
        
        this._service.actualizar(params).subscribe((resp: any) => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'PREGUNTAS','warning');
          }else{
          this._sweet.mensajeSimple('Actualizado correctamente', 'PREGUNTAS', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:1,
            tabla:'PREGUNTAS',
          }
          this._bitacora.crear(params).subscribe();
        }
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }
}
