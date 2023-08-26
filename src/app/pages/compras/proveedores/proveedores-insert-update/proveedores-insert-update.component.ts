import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonasPackageService } from 'src/app/pages/personas/personas/personas-package.service';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ProveedoresPackageService } from '../proveedores-package.service';



@Component({
  selector: 'app-proveedores-insert-update',
  templateUrl: './proveedores-insert-update.component.html',
  styleUrls: ['./proveedores-insert-update.component.css']
})
export class ProveedoresInsertUpdateComponent implements OnInit {
  constructor(public _service: ProveedoresPackageService,
    public dialogref: MatDialogRef<ProveedoresInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,

  ) {
    this._service.mostrarpersona();
   }

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

      if (!this._service.register.get('COD_PROVEEDOR')?.value) {
        
        let datos = this._service.register.value;
        
        let params = {
          persona: datos.COD_PERSONA,
          proveedor: datos.NOMBRE_PROVEEDOR,
          contacto: datos.NOMBRE_CONTACTO
        };

        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','EL proveedor no puede ser eliminado','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'PROVEEDORES', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:1,
              tabla:'PROVEEDORES',
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
          id: datos.COD_PROVEEDOR,
          persona: datos.COD_PERSONA,
          proveedor: datos.NOMBRE_PROVEEDOR,
          contacto: datos.NOMBRE_CONTACTO
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          this._sweet.mensajeSimple('Actualizado correctamente', 'PROVEEDORES', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:1,
            tabla:'PROVEEDORES',
          }
          this._bitacora.crear(params).subscribe();
        
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }
}
