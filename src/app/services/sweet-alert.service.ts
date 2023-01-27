import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
type opcSweet = 'success' | 'error' | 'warning' | 'info' | 'question';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }
  mensajeSimple(titulo:string,texto:string, tipo:opcSweet){
    Swal.fire(titulo.toUpperCase(),texto.toUpperCase(),tipo);
  }


  //Mensaje con confirmacion
  mensajeConConfirmacion(titulo:string,texto:string,icono:opcSweet):Promise<boolean>{
  return  new Promise((resolve,reject)=>{

    Swal.fire({
      title: `${titulo.toUpperCase()}`,
      text: `${texto.toUpperCase()}`,
      icon: icono,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText:'SI',
      cancelButtonText:'NO'
     // confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      //confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.value) {
         resolve( true);
      }else{
        resolve(false);
      }
    })
  })
   }
}
