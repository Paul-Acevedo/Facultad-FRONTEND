import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonasPackageService } from 'src/app/pages/personas/personas/personas-package.service';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ClientesPackageService } from '../clientes-package.service';

@Component({
  selector: 'app-clientes-insert-update',
  templateUrl: './clientes-insert-update.component.html',
  styleUrls: ['./clientes-insert-update.component.css']
})
export class ClientesInsertUpdateComponent implements OnInit {

  constructor(public _service: ClientesPackageService,
    public dialogref: MatDialogRef<ClientesInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public _persona:PersonasPackageService
  ) {
   }

  ngOnInit(): void {
    this._service.mostrarpersona();
    this._service.mostrartipoclientes();
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

      if (!this._service.register.get('COD_CLIENTE')?.value) {
        
        let datos = this._service.register.value;
        
        let params = {
          persona: datos.COD_PERSONA,
          tipocliente: datos.COD_TIPO_CLIENTE
        };

        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','CLIENTES','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'CLIENTES', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'CLIENTES',
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
          persona: datos.COD_PERSONA,
          tipocliente: datos.COD_TIPO_CLIENTE
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          this._sweet.mensajeSimple('Actualizado correctamente', 'CLIENTES', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'CLIENTES',
          }
          this._bitacora.crear(params).subscribe();
        
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }

}
