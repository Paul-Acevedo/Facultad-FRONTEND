import { Component } from '@angular/core';
import { CaiService } from '../cai.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';

@Component({
  selector: 'app-insert-update-cai',
  templateUrl: './insert-update-cai.component.html',
  styleUrls: ['./insert-update-cai.component.css']
})
export class InsertUpdateCaiComponent {

  constructor(public _service: CaiService,
    public dialogref: MatDialogRef<InsertUpdateCaiComponent>,
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

      if (!this._service.register.get('COD_CAI')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          COD_CAI: null,
          CAI:datos.CAI,
          FECHA_INICIO:datos.FECHA_INICIO,
          FECHA_FIN:datos.FECHA_FIN,
          RANGO_DESDE:datos.RANGO_DESDE,
          RANGO_HASTA:datos.RANGO_HASTA,
          FACTURA_SAR:datos.FACTURA_SAR,
          parametro: datos.PARAMETRO
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.data,'CAI','warning');
          }else{
            this._sweet.mensajeSimple('Cai creado correctamente', 'CAI', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'CAI',
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
          CAI:datos.CAI,
          FECHA_INICIO:datos.FECHA_INICIO,
          FECHA_FIN:datos.FECHA_FIN,
          RANGO_DESDE:datos.RANGO_DESDE,
          RANGO_HASTA:datos.RANGO_HASTA,
          FACTURA_SAR:datos.FACTURA_SAR,
          parametro: datos.PARAMETRO,
          id:datos.COD_CAI

        };
        console.log(params);
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','CAI','warning');
          }else{
          this._sweet.mensajeSimple('Cai actualizado correctamente', 'CAI', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'Cai',
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
