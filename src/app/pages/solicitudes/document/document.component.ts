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

  numerosEnLetras = [
    { numero: '01', letra: "uno" },
    { numero: '02', letra: "dos" },
    { numero: '03', letra: "tres" },
    { numero: '04', letra: "cuatro" },
    { numero: '05', letra: "cinco" },
    { numero: '06', letra: "seis" },
    { numero: '07', letra: "siete" },
    { numero: '08', letra: "ocho" },
    { numero: '09', letra: "nueve" },
    { numero: '10', letra: "diez" },
    { numero: '11', letra: "once" },
    { numero: '12', letra: "doce" },
    { numero: '13', letra: "trece" },
    { numero: '14', letra: "catorce" },
    { numero: '15', letra: "quince" },
    { numero: '16', letra: "dieciséis" },
    { numero: '17', letra: "diecisiete" },
    { numero: '18', letra: "dieciocho" },
    { numero: '19', letra: "diecinueve" },
    { numero: '20', letra: "veinte" },
    { numero: '21', letra: "veintiuno" },
    { numero: '22', letra: "veintidós" },
    { numero: '23', letra: "veintitrés" },
    { numero: '24', letra: "veinticuatro" },
    { numero: '25', letra: "veinticinco" },
    { numero: '26', letra: "veintiséis" },
    { numero: '27', letra: "veintisiete" },
    { numero: '28', letra: "veintiocho" },
    { numero: '29', letra: "veintinueve" },
    { numero: '30', letra: "treinta" },
    { numero: '31', letra: "treintiuno" }
  ];
  

   meses = [
    { numero: '01', nombre: "Enero" }, 
    { numero: '02', nombre: "Febrero" }, 
    { numero: '03', nombre: "Marzo" }, 
    { numero: '04', nombre: "Abril" }, 
    { numero: '05', nombre: "Mayo" }, 
    { numero: '06', nombre: "Junio" }, 
    { numero: '07', nombre: "Julio" }, 
    { numero: '08', nombre: "Agosto" }, 
    { numero: '09', nombre: "Septiembre" }, 
    { numero: '10', nombre: "Octubre" }, 
    { numero: '11', nombre: "Noviembre" }, 
    { numero: '12', nombre: "Diciembre" }
  ];

  nombre: string;
  cuenta: string;
  textoporcentaje:any;
  numporcentaje:number;
  identidad:string;
  fecha:Date

  constructor() {

  }

  import() {

    this.numporcentaje = Number(this.numporcentaje)

    if(this.numporcentaje>=65 && this.numporcentaje<=100){
    //let Porcentaje = this.poercentajes.filter((n) => n[this.numporcentaje]);
    let mes = this.fecha.toString()
    let dia = mes.substring(8,10)
    let anio = mes.substring(2,4)
    mes = mes.substring(5,7)
    let mess = this.meses.filter(r=>r.numero == mes);
    let diass = this.numerosEnLetras.filter(r=>r.numero == dia);
    let anioo = this.numerosEnLetras.filter(r=>r.numero == anio);
    console.log(anioo);
  
   
    const doc = new jsPDF({ format: 'a4' });
    doc.text('CONSTANCIA', 78, 50);
    doc.setFontSize(12);
    doc.text(
      `
    La Suscrita Coordinadora de la Carrera de Informática Administrativa de la UNAH,
    por este medio hace Constar Que ${this.nombre} con número de
    cuenta ${this.cuenta} alumna de la Carrera de Informática Administrativa, realizó
    el examen correspondiente al HIMNO NACIONAL DE HONDURAS habiendo sido
    “APROBADO” satisfactoriamente.
    
    Se le extiende la presente constancia en la Ciudad Universitaria “José Trinidad Reyes”
    a los ${diass[0].letra} días del mes de ${mess[0].nombre} del dos mil ${anioo[0].letra}.`,18,60);

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
 
  buenaConducta(){

   
    this.numporcentaje = Number(this.numporcentaje)

    if(this.numporcentaje>=65 && this.numporcentaje<=100 &&  this.fecha != undefined){
    
      let mes = this.fecha.toString()
      let dia = mes.substring(8,10)
      mes = mes.substring(5,7)
      let mess = this.meses.filter(r=>r.numero == mes);
      let diass = this.numerosEnLetras.filter(r=>r.numero == dia);

    const doc = new jsPDF({ format: 'a4' });
    doc.text('CONSTANCIA DE BUENA CONDUCTA', 55, 50);
    doc.setFontSize(12);
    
    doc.text(`
    Por medio de la presente hago constar que: ${this.nombre}, con
    número de identidad ${this.identidad} número de cuenta ${this.cuenta} es estudiante
    de la Carrera de INFORMATICA ADMINISTRATIVA en la Universidad Nacional Autónoma
    de Honduras desde el año 2017 con un índice académico de ${this.numporcentaje}% el cual en su
    trayectoria estudiantil ha tenido un comportamiento con MUY BUENA CONDUCTA.
    
    Y para los fines que al interesado convenga se extiende la presente a los ${diass[0].letra} días
    del mes de ${mess[0].nombre} del dos mil veintitrés..`,18,60);

    doc.setFontSize(14);
    doc.setFont('times', 'italic');
    doc.text('Msc. Dulce Monserrat del Cid', 80, 120);
    doc.setFont('times', 'bold');
    doc.text('Coordinadora  Carrera', 86, 125);
    doc.text('Informática Administrativa', 83, 130);
    doc.text('Facultad de Ciencias Económicas', 77, 135);
    doc.text('Administrativas y Contables', 83, 140);
    doc.save('constanciaBuenaConducta.pdf');
    }else{
    Notiflix.Notify.warning("Todos los campos son obligatorios")
    }
  }


  constaciaEgresado(){
    
    let mes = this.fecha.toString()
    let dia = mes.substring(8,10)
    mes = mes.substring(5,7)
    let mess = this.meses.filter(r=>r.numero == mes);
    let diass = this.numerosEnLetras.filter(r=>r.numero == dia);
    this.numporcentaje = Number(this.numporcentaje)


    if(this.numporcentaje>=65 && this.numporcentaje<=100 && this.fecha != undefined){
    
    const doc = new jsPDF({ format: 'a4' });
    doc.text('CONSTANCIA DE EGRESADO DEL COORDINADOR', 55, 50);
    doc.setFontSize(12);
    
    doc.text(`
    La Suscrita Coordinadora de la Carrera de Informática Administrativa hace
    constar que: ${this.nombre }con número de cuenta ${this.cuenta}
    matriculada en la carrera de Informática Administrativa, a la fecha ha aprobado
    un total de CINCUENTA Y DOS (52) asignaturas del Plan de Estudios haciendo un
    total de DOSCIENTAS DIEZ (210) unidades valorativas, contemplando el 100% del
    plan de estudios correspondiente.

    Por tanto, se autoriza a la secretaria Académica de esta Facultad, emitir la carta de egresado.
    
    Dado en la Ciudad Universitaria a los veinticinco días del mes de ${mes} del dos mil veintitrés.
    (Dicha constancia tiene vigencia de 6 meses).`,18,60);

    doc.setFontSize(14);
    doc.setFont('times', 'italic');
    doc.text('Msc. Dulce Monserrat del Cid', 80, 120);
    doc.setFont('times', 'bold');
    doc.text('Coordinadora  Carrera', 86, 125);
    doc.text('Informática Administrativa', 83, 130);
    doc.text('Facultad de Ciencias Económicas', 77, 135);
    doc.text('Administrativas y Contables', 83, 140);
    doc.save('constanciaBuenaConducta.pdf');
    }else{
    Notiflix.Notify.warning("Todos los campos son obligatorios")
    }
  }


}
