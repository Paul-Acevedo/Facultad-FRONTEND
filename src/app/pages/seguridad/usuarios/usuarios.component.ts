import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { UsuariosInsertUpdateComponent } from './usuarios-insert-update/usuarios-insert-update.component';
import { UsuariosPackageService } from './usuarios-package.service';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import * as Notiflix from 'notiflix';
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

  //filtro

  buscar: any = '';
  campo: any[] = ['USUARIO', 'EMAIL', 'PERSONA', 'NOMBRE_ROL'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  //@ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

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

  ngOnInit(): void {
    console.log(this.item);
    let solicitud: any = JSON.parse(localStorage.getItem('usuario')!);
    console.log(solicitud);
    //this._toas.success('Bienvenido', 'Sistema de Roles');
  }
  ngOnDestroy(): void {}

  excel() {
    let worksheetData: any[] = [];
    let data:any[] = [];
    this._service.mostrar()
    console.log(this._service.response$.subscribe((r) => {
      data = r
    }));
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    XLSX.writeFileXLSX(workbook, 's.xlsx', {});
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
        console.log(result);
        if (result) {
          this._service.eliminar(id).subscribe((resp) => {
            this._service.mostrar();
            if (!resp.ok) {
              this._sweet.mensajeSimple(
                'Ocurrio un error',
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

  //eliminar(id: number) {

  // Swal.fire({
  //   title: 'Esta seguro que desea eliminarlo?',
  //   showDenyButton: true,
  //   confirmButtonText: 'Si',
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     this._service.eliminar({ id })
  //       .subscribe((resp: any) => {
  //         console.log(resp)
  //         if (!resp.ok) {

  //           this._toas.warning('No se puede eliminar', 'Sistema de Roles');
  //         } else {
  //           this._toas.success('Eliminado correctamente', 'Sistema de Roles')
  //           this._service.mostrar();
  //         }

  //         //  let params = {
  //         //    codusuario:this.usuario,
  //         //    codobjeto:25,
  //         //    accion:'ELIMINAR',
  //         //    descripcion:'ELIMINO UN SEXO'
  //         //  }

  //         //  // this._bitacora.crearBitacoradb(params).subscribe(resp=>{
  //         //  //   console.log(resp);
  //         //  // })

  //       });
  //   }
  // })

  //}

  // impo() {

  //   let url = '../../../assets/images/logo.jpg';
  //   let rawHTML = `
  // <div id="otra">
  // <img src="${url}" alt="">
  // <div class="parraf">
  // <h5>CALAPAL</h5>
  // <h5>Listado de Roles</h5>
  // </div>
  // </div><br>`;

  //   printJS({
  //     printable: 'reporte',
  //     type: 'html',
  //     header: rawHTML,
  //     css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  //     style: '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
  //     scanStyles: false,
  //     documentTitle: 'Roles',
  //     font_size: '10pt',
  //     ignoreElements: ['d']
  //   })
  //   // let params = {
  //   //   codusuario: this.usuario,
  //   //   codobjeto: 25,
  //   //   accion: 'DESCARGO',
  //   //   descripcion: 'DESCARGO EL PDF DE SEXO',
  //   // };
  //   // this._bitacora.crearBitacoradb(params).subscribe((resp) => resp);
  // }

  impo() {
    let date = new Date();
    let url = '../../../assets/logo.jpg';
    let rawHTML = `
<div id="otra">
<img src="${url}" alt="">
<div class="parraf">
<h5>Agrocomercial</h5>
<h5>Listado de Usuarios</h5>
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
      documentTitle: 'Usuarios',
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
