import { Component } from '@angular/core';
import { PackageTipoTelefonoService } from '../package-tipo-telefono.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';

@Component({
  selector: 'app-insert-update',
  templateUrl: './insert-update.component.html',
  styleUrls: ['./insert-update.component.css']
})
export class InsertUpdateComponent {
  constructor(public _service: PackageTipoTelefonoService,
    public dialogref: MatDialogRef<InsertUpdateComponent>,
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

      if (!this._service.register.get('COD_TIPO_TELEFONO')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          tipotelefono: datos.TIPO_TELEFONO,
          estado:datos.ESTADO
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'TIPO TELEFONO','warning');
          }else{
            this._sweet.mensajeSimple('creado correctamente', 'TIPO TELEFONO', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'TIPO TELEFONO',
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
          id: datos.COD_TIPO_TELEFONO,
          tipotelefono: datos.TIPO_TELEFONO,
          estado:datos.ESTADO
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'TIPO TELEFONO','warning');
          }else{
          this._sweet.mensajeSimple('Actualizado correctamente', 'Tipo telefono', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'TIPO TELEFONO',
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
