import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as printJS from 'print-js';
import * as XLSX from 'xlsx';
import { ArticulosPackageService } from '../articulos-package.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-movimientos',
  templateUrl: './detalle-movimientos.component.html',
  styleUrls: ['./detalle-movimientos.component.css'],
})
export class DetalleMovimientosComponent {
  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['NOMBRE_ARTICULO', 'DESCRIPCION'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any; //paso //2
  i: number = 0;
  permisos: any = [];

  constructor(
    public _service: ArticulosPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl,
    private route:ActivatedRoute
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrarpermiso(localStorage.getItem('rol'), 15);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });

    this.route.queryParams.subscribe((resp:any)=>{
      this._service.mostrarid(resp.id)
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }


  excel() {
    let worksheetData: any[] = [];
    let data: any[] = [];
    this._service.mostrar();
   
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    XLSX.writeFileXLSX(workbook, 's.xlsx', {});
  }


  impo() {
    let date = new Date();
    let url = '../../../assets/logo.jpg';
    let rawHTML = `
   <div id="otra">
   <img src="${url}" alt="">
   <div class="parraf">
   <h5>Agrocomercial "Libertad"</h5>
   <h5>Listado de Articulos</h5>
   <h6>${date.toLocaleString()}</h6>
   </div>
   </div><br>`;

    printJS({
      printable: 'reporte',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style:
        '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Articulos',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'INGRESO',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'CATEGORIAS',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
