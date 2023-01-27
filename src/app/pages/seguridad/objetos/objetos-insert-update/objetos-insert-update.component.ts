import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from '../../bitacora/bitacora-package.service';
import { ObjetosPackageService } from '../objetos-package.service';

@Component({
  selector: 'app-objetos-insert-update',
  templateUrl: './objetos-insert-update.component.html',
  styleUrls: ['./objetos-insert-update.component.css']
})
export class ObjetosInsertUpdateComponent implements OnInit {


  constructor(public _service: ObjetosPackageService,
    public dialogref: MatDialogRef<ObjetosInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService
  ) {
    this._service.mostrarobjetos();
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

      if (!this._service.register.get('COD_OBJETO')?.value) {
        
        let datos = this._service.register.value;
        
        let params = {
          objeto: datos.OBJETO,
          url: datos.URL,
          icono: datos.ICONO,
          idpadre: datos.ID_PADRE
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','OBJETOS','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'OBJETOS', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'OBJETOS',
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
          id: datos.COD_OBJETO,
          objeto: datos.OBJETO,
          url: datos.URL,
          icono: datos.ICONO,
          idpadre: datos.ID_PADRE
        };
        this._service.actualizar(params).subscribe((resp: any) => {
      
          this._sweet.mensajeSimple('Actualizado correctamente', 'OBJETOS', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'OBJETOS',
          }
          this._bitacora.crear(params).subscribe();
        
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }

}
