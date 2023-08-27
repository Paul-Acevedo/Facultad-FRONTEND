import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as printJS from 'print-js';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ComprasPackageService } from '../compras/compras-package.service';

@Component({
  selector: 'app-detallescompras',
  templateUrl: './detallescompras.component.html',
  styleUrls: ['./detallescompras.component.css']
})
export class DetallescomprasComponent implements OnInit {


  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['NOMBRE_ROL'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any;//paso //2
  i: number = 0;

  constructor(public _service: ComprasPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private _routes:ActivatedRoute
  ) {
    this._routes.queryParams.subscribe(params=>{
      this._service.mostrardetalles(params['id']);
    })

   
  }

  busqueda(){
    this._routes.queryParams.subscribe(params=>{
      this._service.mostrardetalles(params['id'],this.buscar);
    })

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  
  }

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  impo() {

    let url = '../../../assets/logo.jpg';
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5>Agrocomercial "Libertad"</h5>
  <h5>Listado Detalle de Compras</h5>
  <h4>${new Date().toLocaleString()}</h4>
  </div>
  </div><br>`;

    printJS({
      printable: 'reporte',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style: '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Compras',
      font_size: '10pt',
      ignoreElements: ['d']
    })
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: 3,
      tabla: 'COMPRAS'
    };
     this._bitacora.crear(params).subscribe((resp) => resp);
  }

}
