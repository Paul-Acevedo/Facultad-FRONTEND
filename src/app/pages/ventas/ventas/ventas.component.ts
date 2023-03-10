import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { VentasInsertUpdateComponent } from './ventas-insert-update/ventas-insert-update.component';
import { VentasPackageService } from './ventas-package.service';
import * as printJS from 'print-js';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
})
export class VentasComponent implements OnInit {
  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['PRIMER_NOMBRE', 'DNI'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any; //paso //2
  i: number = 0;
  permisos: any = [];

  constructor(
    public _service: VentasPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
    ) {
      paginator.itemsPerPageLabel = 'Cantidad por página'; 
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'), 18);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });


  }

  ngOnInit(): void {}

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
    dialogConfig.width = '20%';
    this._dialog.open(VentasInsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(VentasInsertUpdateComponent);
    this._service.popForm(item);
  }

  eliminar(id: number) {
    this._sweet
      .mensajeConConfirmacion(
        'Eliminar',
        '¿Desea eliminar la venta?',
        'warning'
      )
      .then((result) => {
        if (result) {
          this._service.eliminar(id).subscribe((resp) => {
            this._service.mostrar();
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'VENTAS', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'VENTAS',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'VENTAS',
                'success'
              );
            }
          });
        }
      });
  }

  impo() {
    let url = '../../../assets/logo.jpg';
    let date = new Date();
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5>AGROCOMERCIAL</h5>
  <h5>Listado de Ventas</h5>
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
      documentTitle: 'Ventas',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    // let params = {
    //   codusuario: this.usuario,
    //   codobjeto: 25,
    //   accion: 'DESCARGO',
    //   descripcion: 'DESCARGO EL PDF DE SEXO',
    // };
    // this._bitacora.crearBitacoradb(params).subscribe((resp) => resp);
  }
}
