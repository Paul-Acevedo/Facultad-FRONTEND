import { Component } from '@angular/core';
import { PackageCalendarioService } from '../package-calendario.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insert-update-calendario',
  templateUrl: './insert-update-calendario.component.html',
  styleUrls: ['./insert-update-calendario.component.css']
})
export class InsertUpdateCalendarioComponent {
  constructor(public _service: PackageCalendarioService,
    public dialogref: MatDialogRef<InsertUpdateCalendarioComponent>,
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

      
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          fecha: datos.fecha,
        };

        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'CALENDARIO','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'Calendario', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'CALENDARIO',
            }
            this._bitacora.crear(params).subscribe();
          }
          this._service.mostrar();
        });
        this.cerrarmodal();
    }
  }
}
