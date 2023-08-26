import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PermisosInsertUpdateComponent } from './permisos-insert-update/permisos-insert-update.component';
import { PermisosPackageService } from './permisos-package.service';
import * as printJS from 'print-js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent implements OnInit {
  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['OBJETO', 'NOMBRE_ROL'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any; //paso //2
  i: number = 0;
  permisos: any = [];

  constructor(
    public _service: PermisosPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'), 5);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {

  }

  excel() {
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

    XLSX.writeFileXLSX(workbook, 'Permisos.xlsx', {});
  }

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(PermisosInsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(PermisosInsertUpdateComponent);
    this._service.popForm(item);
  }

  eliminar(id: any) {
    this._sweet
      .mensajeConConfirmacion(
        'Eliminar',
        '¿Desea eliminar el registro?',
        'warning'
      )
      .then((result) => {
        console.log(id);
        if (result) {
          this._service
            .eliminar(id.COD_ROL, id.COD_OBJETO)
            .subscribe((resp) => {
              this._service.mostrar();
              if (!resp.ok) {
                this._sweet.mensajeSimple(
                  'Ocurrio un error',
                  'OBJETOS',
                  'error'
                );
              } else {
                let params = {
                  operacion: 'ELIMINO',
                  fecha: new Date(),
                  idusuario: localStorage.getItem('user'),
                  tabla: 'PERMISOS',
                };
                this._bitacora.crear(params).subscribe();
                this._sweet.mensajeSimple(
                  'Eliminado correctamente',
                  'OBJETOS',
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
  <h5>Agrocomercial "Libertad"</h5>
  <h5>Listado de Permisos</h5>
  <h6>${date.toLocaleString()}</h6>
  </div>
  </div><br>`;

    printJS({
      printable: 'reporte2',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style:
        '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Permisos',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'PERMISOS',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
