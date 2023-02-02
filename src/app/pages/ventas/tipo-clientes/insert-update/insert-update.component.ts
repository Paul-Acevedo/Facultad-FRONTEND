import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonasPackageService } from 'src/app/pages/personas/personas/personas-package.service';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { TipoClientesService } from '../tipo-clientes.service';

@Component({
  selector: 'app-insert-update',
  templateUrl: './insert-update.component.html',
  styleUrls: ['./insert-update.component.css']
})
export class InsertUpdateComponent implements OnInit {

  constructor(public _service: TipoClientesService,
    public dialogref: MatDialogRef<InsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public _persona:PersonasPackageService
  ) {
   }

  ngOnInit(): void {
    
  }

  get validateOpinion(){
    return this._service.register.controls;
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

  guardar() {

    if (this._service.register.valid) {

      if (!this._service.register.get('COD_TIPO_CLIENTE')?.value) {
        
        let datos = this._service.register.value;
        
        let params = {
          tipo: datos.TIPO_CLIENTE,
          rebaja: datos.REBAJA
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','TIPO CLIENTES','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'TIPO CLIENTES', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'TIPO CLIENTES',
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
          id: datos.COD_CLIENTE,
          tipo: datos.TIPO_CLIENTE,
          rebaja: datos.REBAJA
        };
        this._service.actualizar(params).subscribe((resp: any) => {
      console.log(resp)
          this._sweet.mensajeSimple('Actualizado correctamente', 'TIPO CLIENTES', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'TIPO CLIENTES',
          }
          this._bitacora.crear(params).subscribe();
        
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }

}
