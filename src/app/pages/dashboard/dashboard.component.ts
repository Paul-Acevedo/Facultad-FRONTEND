import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  ventas: number;
  compras: number;
  productos:any[];
  clientes:number;
  usuarios:number;

  constructor(private http: HttpClient) {

    this.http.get(environment.url + 'comprasCount').subscribe((resp: any) => {
      this.compras = resp.data[0].num;
    });

    this.http.get(environment.url + 'ventasCount').subscribe((resp: any) => {
      this.ventas = resp.data[0].num;
    });


    this.http.get(environment.url + 'articulosexistencia').subscribe((resp: any) => {
      this.productos = resp.data;
    });

    this.http.get(environment.url + 'usuariocount').subscribe((resp: any) => {
      this.usuarios = resp.data[0].num;
    });

    this.http.get(environment.url + 'clientescount').subscribe((resp: any) => {
      this.clientes =resp.data[0].num;
    });
  }
}
