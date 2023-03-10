import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { PackageDireccionService } from '../package-direccion.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PackageTipoDireccionService } from '../../tipo-direccion/package-tipo-direccion.service';

@Component({
  selector: 'app-insert-update',
  templateUrl: './insert-update.component.html',
  styleUrls: ['./insert-update.component.css']
})
export class InsertUpdateComponent {
 
  constructor(public _service: PackageDireccionService,
    public dialogref: MatDialogRef<InsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public tipo_telefono:PackageTipoDireccionService
  ) { 

  }

  ngOnInit(): void {

    this.tipo_telefono.mostrar()
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
      
console.log(this._service.register.get('COD_DIRECCION')?.value);
      if (!this._service.register.get('COD_DIRECCION')?.value) {
        // crea usuario
        let datos = this._service.register.value;
      
        let params = {
          COD_TIPO_DIRECCION: datos.COD_TIPO_DIRECCION,
          CALLE: datos.CALLE,
          COD_PERSONA:this._service.id,
          BLOQUE: datos.BLOQUE,
          AVENIDA: datos.AVENIDA,
          DIRECCION: datos.DIRECCION,
          CIUDAD: datos.CIUDAD,

        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','DIRECCION','warning');
          }else{
            this._sweet.mensajeSimple('creado correctamente', 'DIRECCION', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'DIRECCION',
            }
            this._bitacora.crear(params).subscribe();
          }
          this._service.mostrar()
        });
        this.cerrarmodal();
      } else {
        // actualiza ususario
        let datos = this._service.register.value;

        let params = {
          id: datos.COD_DIRECCION,
          COD_TIPO_DIRECCION: datos.COD_TIPO_DIRECCION,
          CALLE: datos.CALLE,
          COD_PERSONA:this._service.id,
          BLOQUE: datos.BLOQUE,
          AVENIDA: datos.AVENIDA,
          DIRECCION: datos.DIRECCION,
          CIUDAD: datos.CIUDAD,
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','DIRECCION','warning');
          }else{
          this._sweet.mensajeSimple('Actualizado correctamente', 'DIRECCION', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'DIRECCION',
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
