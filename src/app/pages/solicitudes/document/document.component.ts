import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as Notiflix from 'notiflix';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent {

  poercentajes = [
    { 65: 'Sesenta y cinco' },
    { 66: 'Sesenta y seis' },
    { 67: 'Sesenta y siete' },
    { 68: 'Sesenta y ocho' },
    { 69: 'Sesenta y nueve' },
    { 70: 'Setenta' },
    { 71: 'Setenta y uno' },
    { 72: 'Setenta y dos' },
    { 73: 'Setenta y tres' },
    { 74: 'Setenta y cuatro' },
    { 75: 'Setenta y cinco' },
    { 76: 'Setenta y seis' },
    { 77: 'Setenta y siete' },
    { 78: 'Setenta y ocho' },
    { 79: 'Setenta y nueve' },
    { 80: 'Ochenta' },
    { 81: 'Ochenta y uno' },
    { 82: 'Ochenta y dos' },
    { 83: 'Ochenta y tres' },
    { 84: 'Ochenta y cuatro' },
    { 85: 'Ochenta y cinco' },
    { 86: 'Ochenta y seis' },
    { 87: 'Ochenta y siete' },
    { 88: 'Ochenta y ocho' },
    { 89: 'Ochenta y nueve' },
    { 90: 'Noventa' },
    { 91: 'Noventa y uno' },
    { 92: 'Noventa y dos' },
    { 93: 'Noventa y tres' },
    { 94: 'Noventa y cuatro' },
    { 95: 'Noventa y cinco' },
    { 96: 'Noventa y seis' },
    { 97: 'Noventa y siete' },
    { 98: 'Noventa y ocho' },
    { 99: 'Noventa y nueve' },
    { 100: ' Cien' },
  ];

  nombre: string;
  cuenta: string;
  textoporcentaje:any;
  numporcentaje:number;

  constructor() {

  }

 

  import() {

    this.numporcentaje = Number(this.numporcentaje)

    if(this.numporcentaje>=65 && this.numporcentaje<=100){
    let Porcentaje = this.poercentajes.filter((n) => n[this.numporcentaje]);
  
    const doc = new jsPDF({ format: 'a4' });
    doc.text('C O N S T A N C I A', 78, 50);
    doc.setFontSize(12);
    doc.text(
      `
    La Suscrita Coordinadora de la Carrera de Informática Administrativa de la UNAH,
    por este medio hace Constar Que ${this.nombre} con número de
    cuenta ${this.cuenta} alumna de la Carrera de Informática Administrativa, realizó
    el examen correspondiente al HIMNO NACIONAL DE HONDURAS habiendo sido
    “APROBADO” satisfactoriamente con ${this.numporcentaje}% (${Porcentaje[0][this.numporcentaje]}).
    
    Se le extiende la presente constancia en la Ciudad Universitaria “José Trinidad Reyes”
    a los cinco días del mes de febrero del dos mil diecinueve.`,18,60);
    
    doc.setFontSize(14);
    doc.setFont('times', 'italic');
    doc.text('Msc. Dulce Monserrat del Cid', 80, 120);
    doc.setFont('times', 'bold');
    doc.text('Coordinadora  Carrera', 86, 125);
    doc.text('Informática Administrativa', 83, 130);

    doc.save('constancia.pdf');
    }else{
    Notiflix.Notify.warning("La calificacion debe de ser entre 65 y 100")
    }
  }
}
