import { Component } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent {

  currentValue = 0; // valor actual del progreso
  maxValue = 10;    // valor máximo del progreso

  getProgress(): number {
    return (this.currentValue / this.maxValue) * 100;
  }

  constructor(private _service:GlobalService){
    let id = localStorage.getItem('user')
    this._service.obtenerId('solicitud',id).subscribe(r=>{
      this.currentValue = r[0].c;
    })
  }

  value = 50; // valor actual de la barra de progreso
  max = 100;  // valor máximo de la barra de progreso
}
