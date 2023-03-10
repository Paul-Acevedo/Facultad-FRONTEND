import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ProveedoresInsertUpdateComponent } from './proveedores-insert-update/proveedores-insert-update.component';
import { ProveedoresPackageService } from './proveedores-package.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {


  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro
  permisos:any = [];
  buscar: any = '';
  campo: any[] = ['PRIMER_NOMBRE','NOMBRE_CONTACTO','NOMBRE_PROVEEDOR'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any;//paso //2
  i: number = 0;

  constructor(public _service: ProveedoresPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
    ) {
      paginator.itemsPerPageLabel = 'Cantidad por página'; 
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'),12);
    this._service.responsepermiso$.subscribe(r=>{
     this.permisos = r[0];
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
  crear() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this._dialog.open(ProveedoresInsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    this._dialog.open(ProveedoresInsertUpdateComponent);
    this._service.popForm(item);
  }

  eliminar(id: number) {

    this._sweet.mensajeConConfirmacion('Eliminar', '¿Desea eliminar el registro?', 'warning').
      then((result) => {
        console.log(result);
        if (result) {
          this._service.eliminar(id).subscribe(resp => {
            console.log(resp)
            this._service.mostrar();
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'PROVEEDORES', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'PROVEEDORES',
              }
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple('Eliminado correctamente', 'PROVEEDORES', 'success');
            }
          })
        }
      })

  }

  
  impo() {
 let date = new Date()
    let url = '../../../assets/logo.jpg';
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5>AGROCOMERCIAL</h5>
  <h5>Listado de Proveedores</h5>
  <h6>${date.toLocaleString()}</h6>
  </div>
  </div><br>`;

    printJS({
      printable: 'reporte',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style: '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Proveedores',
      font_size: '10pt',
      ignoreElements: ['d']
    })
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: 3,
      tabla: 'PROVEEDORES'
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }

}
