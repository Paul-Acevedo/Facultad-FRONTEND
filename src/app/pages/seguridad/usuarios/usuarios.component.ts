import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { UsuariosInsertUpdateComponent } from './usuarios-insert-update/usuarios-insert-update.component';
import { UsuariosPackageService } from './usuarios-package.service';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as printJS from 'print-js';
import * as XLSX from 'xlsx';

export interface ICustomHeader {
  name: string;
  key: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  
  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde
  buscar: any = '';
  campo: any[] = ['USUARIO', 'EMAIL', 'PERSONA', 'NOMBRE_ROL'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];
  usuario: any; //paso //2
  permisos: any = [];

  constructor(
    public _service: UsuariosPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'), 2);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  busqueda(){
    this._service.mostrar(this.buscar);
  }

  ngOnInit(): void {
    let solicitud: any = JSON.parse(localStorage.getItem('usuario')!);
  }
  ngOnDestroy(): void {}

  excel() {
    let data: any[] = [];
    this._service.mostrar(this.buscar);
    this._service.response$.subscribe((r) => {
      data = r;
    })
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    XLSX.writeFileXLSX(workbook, 'usuarios.xlsx', {});
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
    this._dialog.open(UsuariosInsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this._dialog.open(UsuariosInsertUpdateComponent);
    this._service.popForm(item);
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
            this._service.mostrar(this.buscar);
            if (!resp.ok) {
              this._sweet.mensajeSimple(
                'No puede eliminar usuarios',
                'USUARIOS',
                'error'
              );
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'USUARIOS',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'USUARIOS',
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
     <h5>Listado de Usuarios</h5>
     <h6>${date.toLocaleString()}</h6>
     <h5>Registrado por </h5>
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
      documentTitle: 'Reporte Usuarios',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'USUARIOS',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
