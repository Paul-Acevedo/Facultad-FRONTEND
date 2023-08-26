import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ComprasInsertUpdateComponent } from './compras-insert-update/compras-insert-update.component';
import { ComprasPackageService } from './compras-package.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { InsertUpdatePagoComponent } from './insert-update-pago/insert-update-pago.component';
import * as printJS from 'print-js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  
  pageSize: number = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde
  stateCtrl: FormControl = new FormControl();
  filteredStates: Observable<any[]>;
  states: String[];
  permisos: any = [];
  buscar: any = '';
  campo: any[] = ['PRIMER_NOMBRE', 'DNI'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];
  usuario: any; //paso //2
  i: number = 0;

  constructor(
    public _service: ComprasPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {

    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'), 19);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    })
    
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  pagar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(InsertUpdatePagoComponent);
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
    this._dialog.open(ComprasInsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(ComprasInsertUpdateComponent);
    this._service.popForm(item);
  }

  excel() {
    let data: any[] = [];
    this._service.mostrar();
  
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;
    XLSX.writeFileXLSX(workbook, 'compras.xlsx', {});
  }

  eliminar(id: number) {
    this._sweet
      .mensajeConConfirmacion(
        'Eliminar',
        '¿Desea eliminar la compra?',
        'warning'
      )
      .then((result) => {
        if (result) {
          this._service.eliminar(id).subscribe((resp) => {
            this._service.mostrar();
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'COMPRAS', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'COMPRA',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'COMPRAS',
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
  <h5>Listado de Compras</h5>
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
      documentTitle: 'Compras',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: 3,
      tabla: 'COMPRAS',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
