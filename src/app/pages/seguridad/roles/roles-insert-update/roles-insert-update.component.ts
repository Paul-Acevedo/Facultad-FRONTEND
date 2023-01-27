import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from '../../bitacora/bitacora-package.service';
import { RolesPackageService } from '../roles-package.service';

@Component({
  selector: 'app-roles-insert-update',
  templateUrl: './roles-insert-update.component.html',
  styleUrls: ['./roles-insert-update.component.css']
})
export class RolesInsertUpdateComponent implements OnInit {

  constructor(public _service: RolesPackageService,
    public dialogref: MatDialogRef<RolesInsertUpdateComponent>,
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

      if (!this._service.register.get('COD_ROL')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          rol: datos.NOMBRE_ROL,
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','ROLES','warning');
          }else{
            this._sweet.mensajeSimple('Rol creado correctamente', 'Roles', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'ROLES',
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
          id: datos.COD_ROL,
          rol: datos.NOMBRE_ROL,
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','ROLES','warning');
          }else{
          this._sweet.mensajeSimple('Rol actualizado correctamente', 'Roles', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'ROLES',
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
