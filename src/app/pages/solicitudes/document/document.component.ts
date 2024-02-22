import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as Notiflix from 'notiflix';
import { environment } from 'src/environments/environment.prod';
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
  fechai:Date;
  nombre: string;
  cuenta: string;
  textoporcentaje:any;
  numporcentaje:number;
  identidad:string;
  fecha:string = new Date().toISOString().slice(0,10);
  data:any = [];
  constructor(private _httop:HttpClient) {

  }

  import() {

    if(this.cuenta != undefined){
    let mes = this.fecha;
    let dia = mes.substring(8,10)
    let anio = mes.substring(2,4)
    mes = mes.substring(5,7)
    let mess = this.meses.filter(r=>r.numero == mes);
    let diass = this.numerosEnLetras.filter(r=>r.numero == dia);
    let anioo = this.numerosEnLetras.filter(r=>r.numero == anio);
   
  
   
    const doc = new jsPDF();
    doc.text('CONSTANCIA', 85, 50);
    doc.setFontSize(12);
    doc.text(`El suscrito (a) Coordinador de la Carrera de Informática Administrativa, por este medio hace constar que el (a) joven ${this.data.nombre}, No. de Cuenta ${this.cuenta}, estudiante de la Carrera de Informática Administrativa, realizó el examen correspondiente al HIMNO NACIONAL DE HONDURAS, y habiendo sido “APROBADO” satisfactoriamente, se le extiende la presente constancia en la Ciudad Universitaria a los ${diass[0].letra}  días del mes de ${mess[0].nombre} del dos mil ${anioo[0].letra}.`,30,60,{maxWidth: 150, align: "justify"})   
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('Msc. Dulce Monserrat del Cid Fiallos ', 70, 120);
    doc.setFont('times', 'normal');
    doc.text('Coordinadora Académica', 82, 125);
    doc.text('Carrera de Informática Administrativa ', 72, 130);
    doc.save('constancia.pdf');
    }else{
    Notiflix.Notify.warning("EL nombre y número de cuenta son obligatorios")
    }
  }
 
  buenaConducta(){

    this.numporcentaje = Number(this.numporcentaje)

    if(this.numporcentaje>=65 && this.numporcentaje<=100 &&  this.fechai != undefined && this.cuenta != undefined){
     

      let mes = this.fecha
      let dia = mes.substring(8,10)
      let anio = mes.substring(2,4)
      mes = mes.substring(5,7)
      let mess = this.meses.filter(r=>r.numero == mes);
      let diass = this.numerosEnLetras.filter(r=>r.numero == dia);
      let anioo = this.numerosEnLetras.filter(r=>r.numero == anio);
      let f = this.fechai.toString().slice(0,4);

    const doc = new jsPDF({ format: 'a4' });
    doc.setFont('times', 'bold');
    doc.text('CONSTANCIA', 85, 50);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text(`Por medio de la presente hago constar que ${this.data.nombre} con Número cuenta ${this.cuenta}, estudiante de la carrera de INFORMATICA ADMINISTRATIVA en la Universidad Nacional Autónoma de Honduras desde el año ${f} con un índice académico de ${this.numporcentaje}% el cual en su trayectoria estudiantil ha tenido un comportamiento con MUY BUENA CONDUCTA.`,30,60,{maxWidth: 150, align: "justify"})
    doc.text(`Y para los fines que al/la interesado (a) convenga se extiende la presente a los ${diass[0].letra} días del mes de ${mess[0].nombre} del dos mil ${anioo[0].letra}.`,30,90,{maxWidth: 150, align: "justify"});
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('Msc. Dulce Monserrat del Cid Fiallos ', 70, 120);
    doc.setFont('times', 'normal');
    doc.text('Coordinadora Académica', 82, 125);
    doc.text('Carrera de Informática Administrativa ', 72, 130);
    doc.save('constanciaBuenaConducta.pdf');
    }else{
    Notiflix.Notify.warning("Todos los campos son obligatorios")
    }
  }

  laboratorio(){
    if(this.cuenta != undefined){
     
      let mes = this.fecha
      let dia = mes.substring(8,10)
      let anio = mes.substring(2,4)
      mes = mes.substring(5,7)
      let mess = this.meses.filter(r=>r.numero == mes);
      let diass = this.numerosEnLetras.filter(r=>r.numero == dia);
      let anioo = this.numerosEnLetras.filter(r=>r.numero == anio);
    
    const doc = new jsPDF();
    doc.setFont('times', 'bold');
    doc.text('CONSTANCIA', 85, 50);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text(`Por este medio se hace constar que el (la) joven estudiante ${this.data.nombre}, No. de Cuenta ${this.cuenta}, está SOLVENTE en lo que se refiere a equipo de computación y demás de los laboratorios de la Carrera de Informática Administrativa.`,30,60,{maxWidth: 150, align: "justify"})
    doc.text(`Y, para los fines que al (la) interesado(a) convengan firmo la presente constancia en la Ciudad Universitaria a los ${diass[0].letra} días del mes de ${mess[0].nombre} del dos mil ${anioo[0].letra}.`,30,90,{maxWidth: 150, align: "justify"});
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('Msc. Dulce Monserrat del Cid Fiallos ', 70, 120);
    doc.setFont('times', 'normal');
    doc.text('Coordinadora Académica', 82, 125);
    doc.text('Carrera de Informática Administrativa ', 72, 130);
    doc.save('constanciaBuenaConducta.pdf');
    }else{
    Notiflix.Notify.warning("Todos los campos son obligatorios")
    }

  }


  constaciaEgresado(){
    
    let mes = this.fecha;
    let dia = mes.substring(8,10);
    let anio = mes.substring(2,4);
    mes = mes.substring(5,7)
    let mess = this.meses.filter(r=>r.numero == mes);
    let diass = this.numerosEnLetras.filter(r=>r.numero == dia);
    let anioo = this.numerosEnLetras.filter(r=>r.numero == anio);
    this.numporcentaje = Number(this.numporcentaje)


    if(this.numporcentaje>=65 && this.numporcentaje<=100 && this.cuenta != undefined){
    
    const doc = new jsPDF({ format: 'a4' });
    doc.text('CONSTANCIA', 85, 50);
    doc.setFontSize(12);
    
    doc.text(`La suscrita coordinadora de la Carrera de Informática Administrativa de la Universidad Nacional Autónoma de Honduras hace constar que el(la) alumno(a): ${this.data.nombre} con número de cuenta: ${this.cuenta}, matriculado (a) en la Carrera de Informática Administrativa a la fecha ha aprobado un total de 52 asignaturas con 210 unidades valorativas, contemplando el 100% del plan de estudios correspondiente.`,30,60,{maxWidth: 150, align: "justify"});
    doc.text(`Por tanto, se autoriza a la Secretaria Académica de la Facultad de Ciencias Económicas Administrativas y Contables extender la correspondiente Constancia de Egresado.`,30,95,{maxWidth: 150, align: "justify"});
    doc.text(`A los ${diass[0].letra}  días del mes de ${mess[0].nombre} del año dos mil ${anioo[0].letra}, en Ciudad Universitaria, José Trinidad Reyes. Dicha Constancia tiene una vigencia de seis (6) meses.`,30,115,{maxWidth: 150, align: "justify"});
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('Msc. Dulce Monserrat del Cid Fiallos ', 70, 140);
    doc.setFont('times', 'normal');
    doc.text('Coordinadora Académica', 82, 145);
    doc.text('Carrera de Informática Administrativa ', 72, 150);
    doc.save('constanciaBuenaConducta.pdf');
    }else{
    Notiflix.Notify.warning("Todos los campos son obligatorios")
    }
  }

  buscar(){

    if (this.cuenta == undefined) {
      Notiflix.Notify.failure("El número de cuenta es obligatorio")
    }else{
      this._httop.get(environment.url+'buscar/'+this.cuenta).subscribe(resp=>{
        if(resp['data'].length == 0){
          Notiflix.Notify.failure("No se encontro ningun resultado")
          this.data = []
        }else{
         this.data = resp['data'][0]
         console.log(this.data );
        }
      })
    }

  }

}
