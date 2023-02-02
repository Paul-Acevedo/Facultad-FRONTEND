import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { CategoriasPackageService } from '../categorias-package.service';


@Component({
  selector: 'app-categorias-insert-update',
  templateUrl: './categorias-insert-update.component.html',
  styleUrls: ['./categorias-insert-update.component.css']
})
export class CategoriasInsertUpdateComponent implements OnInit {

  constructor(public _service: CategoriasPackageService,
    public dialogref: MatDialogRef<CategoriasInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService
  ) {

   }

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

      if (!this._service.register.get('COD_CATEGORIA')?.value) {
        
        let datos = this._service.register.value;
        
        let params = {
          categoria: datos.NOM_CATEGORIA,
          descripcion: datos.DESCRIPCION
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','CATEGORIAS','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'CATEGORIAS', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:1,
              tabla:'CATEGORIAS',
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
          id: datos.COD_CATEGORIA,
          categoria: datos.NOM_CATEGORIA,
          descripcion: datos.DESCRIPCION
        };
        this._service.actualizar(params).subscribe((resp: any) => {
      console.log(resp)
          this._sweet.mensajeSimple('Actualizado correctamente', 'CATEGORIAS', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:1,
            tabla:'CATEGORIAS',
          }
          this._bitacora.crear(params).subscribe();
        
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }


}
