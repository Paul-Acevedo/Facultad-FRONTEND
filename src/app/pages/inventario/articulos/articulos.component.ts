import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ArticulosInsertUpdateComponent } from './articulos-insert-update/articulos-insert-update.component';
import { ArticulosPackageService } from './articulos-package.service';
import * as printJS from 'print-js';
import * as XLSX from 'xlsx';
import { InsertProductosComponent } from './insert-productos/insert-productos.component';
import { DisminuirProductosComponent } from './disminuir-productos/disminuir-productos.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
})
export class ArticulosComponent implements OnInit {
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
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrarpermiso(localStorage.getItem('rol'), 15);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {
    this._service.mostrar();
  }

  ngOnDestroy(): void {}

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }
  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(ArticulosInsertUpdateComponent);
    this._service.inicializarForm();
  }

  disminuir(item:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(DisminuirProductosComponent);
    this._service.registerr.get('COD_ARTICULO').setValue(item.COD_ARTICULO)
  }

  crearr(item:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(InsertProductosComponent);
    this._service.registerr.get('COD_ARTICULO').setValue(item.COD_ARTICULO)
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(ArticulosInsertUpdateComponent);
    this._service.popForm(item);
  }

  excel() {
    let worksheetData: any[] = [];
    let data: any[] = [];
    this._service.mostrar();
    console.log(
      this._service.response$.subscribe((r) => {
        data = r;
      })
    );
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    XLSX.writeFileXLSX(workbook, 's.xlsx', {});
  }
  eliminar(id: number) {
    this._sweet
      .mensajeConConfirmacion(
        'Eliminar',
        '¿Desea eliminar el registro?',
        'warning'
      )
      .then((result) => {
        if (result) {
          this._service.eliminar(id).subscribe((resp) => {
            this._service.mostrar();
            console.log(resp);
            if (!resp.ok) {
              console.log(resp);
              this._sweet.mensajeSimple(
                'Ocurrio un error',
                'ARTICULOS',
                'error'
              );
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'ARTICULOS',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'ARTICULOS',
                'success'
              );
            }
          });
        }
      });
  }

  impo() {
    let date = new Date();
    let url = '../../../assets/logo.jpg';
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5>Agrocomercial "La Libertad"</h5>
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
