import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SweetAlertService } from '../services/sweet-alert.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { PackageEmpresaService } from '../pages/seguridad/empresa/package-empresa.service';

@Component({
  selector: 'app-full-component',
  templateUrl: './full-component.component.html',
  styleUrls: ['./full-component.component.css'],
})
export class FullComponentComponent {
  opened = true;
  panelOpenState = false;
  permisos: any[] = [];
  parametros: any = [];
  usuario: any = [];
  fecha: any;
  empresa: any = [];
  permiso: string = localStorage.getItem('rol');

  constructor(
    private _service: GlobalService,
    private _alert: SweetAlertService,
    private _ruter: Router,
    private _empresa: PackageEmpresaService
  ) {
    //this._alert.mensajeSimple('Bienvenido a Tecnomaster','','success');
    this.fecha = new Date().getFullYear();
    this._service.mostrarpermisos().subscribe((resp) => {
      this.permisos = resp;
    });

    this._empresa.mostrar();
    this._empresa.response$.subscribe((resp) => {
      this.empresa = resp[0];
    });

    this._service.mostrarusuario().subscribe((resp) => {
      this.usuario = resp[0];
    });
  }

  salir() {
    this._alert
      .mensajeConConfirmacion('SALIR', 'Desea salir del sistema?', 'warning')
      .then((r) => {
        if (r) {
          localStorage.clear();
          localStorage.removeItem('token');
          this._ruter.navigateByUrl('/inicio');
        }
      });
  }
}
