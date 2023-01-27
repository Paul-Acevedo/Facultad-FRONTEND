import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from '../../bitacora/bitacora-package.service';
import { ParametrosInsertUpdateService } from '../parametros-insert-update.service';

@Component({
  selector: 'app-parametros-insert-update',
  templateUrl: './parametros-insert-update.component.html',
  styleUrls: ['./parametros-insert-update.component.css']
})
export class ParametrosInsertUpdateComponent implements OnInit {

  constructor(public _service: ParametrosInsertUpdateService,
    public dialogref: MatDialogRef<ParametrosInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService
  ) { }

  ngOnInit(): void {
  }

  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  //cerrarmodal
  cerrarmodal() {
    this.dialogref.close();
  }

  get validateOpinion(){
    return this._service.register.controls;
  }
  
  
  guardar() {


    if (this._service.register.valid) {

      if (!this._service.register.get('ID_PARAMETRO')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          parametro: datos.PARAMETRO,
          valor:datos.VALOR
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','PARAMETROS','warning');
          }else{
            this._sweet.mensajeSimple('Parametro creado correctamente', 'Parametros', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'PARAMETROS',
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
          parametro: datos.PARAMETRO,
          valor:datos.VALOR,
          id:datos.ID_PARAMETRO
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','Parametros','warning');
          }else{
          this._sweet.mensajeSimple('Parametro actualizado correctamente', 'Parametros', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'PARAMETROS',
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
