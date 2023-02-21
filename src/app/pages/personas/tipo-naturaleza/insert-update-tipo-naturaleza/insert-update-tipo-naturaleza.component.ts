import { Component } from '@angular/core';
import { PackageTipoNaturalezaService } from '../package-tipo-naturaleza.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';

@Component({
  selector: 'app-insert-update-tipo-naturaleza',
  templateUrl: './insert-update-tipo-naturaleza.component.html',
  styleUrls: ['./insert-update-tipo-naturaleza.component.css']
})
export class InsertUpdateTipoNaturalezaComponent {

  constructor(public _service: PackageTipoNaturalezaService,
    public dialogref: MatDialogRef<InsertUpdateTipoNaturalezaComponent>,
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

      if (!this._service.register.get('COD_TIPO_NATURALEZA')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          tipo: datos.TIPO,
        };

        this._service.crear(params).subscribe(resp => {
          console.log(resp)
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','TIPO NATURALEZA','warning');
          }else{
            this._sweet.mensajeSimple('Rol creado correctamente', 'TIPO NATURALEZA', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'TIPO NATURALEZA',
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
          id: datos.COD_TIPO_NATURALEZA,
          tipo: datos.TIPO,
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','TIPO NATURALEZA','warning');
          }else{
          this._sweet.mensajeSimple('Rol actualizado correctamente', 'TIPO NATURALEZA', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'TIPO NATURALEZA',
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
