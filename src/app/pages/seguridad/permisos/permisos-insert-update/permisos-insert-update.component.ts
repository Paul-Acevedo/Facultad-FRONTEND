import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ObjetosPackageService } from '../../objetos/objetos-package.service';
import { RolesPackageService } from '../../roles/roles-package.service';
import { PermisosPackageService } from '../permisos-package.service';

@Component({
  selector: 'app-permisos-insert-update',
  templateUrl: './permisos-insert-update.component.html',
  styleUrls: ['./permisos-insert-update.component.css']
})
export class PermisosInsertUpdateComponent implements OnInit {

  constructor(public _service: PermisosPackageService,
    public dialogref: MatDialogRef<PermisosInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: GlobalService,
    public _roles:RolesPackageService,
    public _objeto:ObjetosPackageService
  ) { }

  ngOnInit(): void {
    this._roles.mostrar();
    this._objeto.mostrar();
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

      if (!this._service.register.get('COD_PERMISO')?.value) {
        // crea usuario
        let datos = this._service.register.value;
       
        let params = {
          rol: datos.COD_ROL,
          objeto: datos.COD_OBJETO,
          insertar: datos.INSERTAR == false ? 'NO' : 'SI',
          actualizar: datos.ACTUALIZAR == false ? 'NO' : 'SI',
          consultar: datos.CONSULTAR == false ? 'NO' : 'SI',
          eliminar: datos.ELIMINAR == false ? 'NO' : 'SI',
        };


        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple(`${resp.data}`,'PERMISOS','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'PERMISOS', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'PERMISOS',
            }
            this._bitacora.crear(params).subscribe();
          this._service.mostrar();

          }
        });
        this.cerrarmodal();
      } else {
   
        let datos = this._service.register.value;

        let params = {
          rol: datos.COD_ROL,
          objeto: datos.COD_OBJETO,
          insertar: datos.INSERTAR == false ? 'NO' : 'SI',
          actualizar: datos.ACTUALIZAR == false ? 'NO' : 'SI',
          consultar: datos.CONSULTAR == false ? 'NO' : 'SI',
          eliminar: datos.ELIMINAR == false ? 'NO' : 'SI',
          permiso: datos.COD_PERMISO 
        };
        
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','PERMISOS','warning');
          }else{
          this._sweet.mensajeSimple('Actualizado correctamente', 'PERMISOS', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'PERMISOS',
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