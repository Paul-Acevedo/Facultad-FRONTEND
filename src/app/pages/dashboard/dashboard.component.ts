import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  ventas: number;
  compras: number;
  productos: any[];
  clientes: number;
  usuarios: number;
  permisos: string;

  constructor(private http: HttpClient) {
    // this._service.mostrarpermiso(localStorage.getItem('rol'),10);
    // this._service.responsepermiso$.subscribe(r=>{
    //  this.permisos = r[0];
    // })

    this.mostrarpermiso();
  }

  mostrarpermiso() {
    this.http
      .get(environment.url +`permisossistemaid/${localStorage.getItem('rol')}/${30}`
      )
      .subscribe((resp: any) => {
        this.permisos = resp.data[0].CONSULTAR;
      });
  }
}
