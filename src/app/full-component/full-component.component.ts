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
  constructor(private _service:GlobalService,
    private _alert:SweetAlertService,
    private _ruter:Router) {
    this._service.mostrarpermisos().subscribe(resp => {
      this.permisos = resp;
      console.log(resp);
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
