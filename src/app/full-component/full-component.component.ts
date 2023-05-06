import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SweetAlertService } from '../services/sweet-alert.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-component',
  templateUrl: './full-component.component.html',
  styleUrls: ['./full-component.component.css']
})
export class FullComponentComponent {

  opened = true;
  panelOpenState = false;
  permisos: any[] = [];
  parametros:any = [];
  usuario:any = [];
  fecha:any;

  constructor(private _service:GlobalService,
    private _alert:SweetAlertService,
    private _ruter:Router) {
      this.fecha = new Date().getFullYear() ;
    this._service.mostrarpermisos().subscribe(resp => {
      this.permisos = resp;
      console.log(resp);
    })

    this._service.obtener('parametros').subscribe(resp=>{
     this.parametros = resp[1]['VALOR'];
    })

    this._service.mostrarusuario().subscribe(resp=>{
      this.usuario = resp[0];
      
    })
   }

   salir(){
    this._alert.mensajeConConfirmacion('SALIR','Desea salir del sistema?','warning').then(r=>{
      if(r){
        localStorage.clear();
        localStorage.removeItem('token');
this._ruter.navigateByUrl('/inicio');
      }
    })
   }
}
