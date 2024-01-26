import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
})
export class CitaComponent {
  calendario: any = [];
  id:any
  constructor(
    public dialogref: MatDialogRef<CitaComponent>,
    public _http: HttpClient
  ) {
    this._http
      .get('http://localhost:3000/calendario')
      .subscribe((resp: any) => {
        console.log(resp);
        this.calendario = resp.data;
      });
  }

  cerrarmodal() {
    this.dialogref.close();
  }

  pasar(id){
  this.id = id
  }
  guardar() {

    let user = localStorage.getItem("user");
    let parametros = {
      user:user,
      descripcion:'Solicitud de revision de expediente',
      id:this.id
    }
    this._http
    .post('http://localhost:3000/solicitud',parametros)
    .subscribe((resp: any) => {
      if(resp.ok){
        Notify.success(resp.msg)
      }else{
        Notify.warning(resp.msg)
      }
    });

  }
}
