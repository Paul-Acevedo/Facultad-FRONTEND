import { Component } from '@angular/core';
import * as printJS from 'print-js';
import { InsertUpdateComponent } from './insert-update/insert-update.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { GlobalService } from 'src/app/services/global.service';
import { PackageTipoDireccionService } from './package-tipo-direccion.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tipo-direccion',
  templateUrl: './tipo-direccion.component.html',
  styleUrls: ['./tipo-direccion.component.css']
})
export class TipoDireccionComponent {
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['TIPO_DIRECCION'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any;//paso //2

  permisos:any = [];

  constructor(public _service: PackageTipoDireccionService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
    ) {
      paginator.itemsPerPageLabel = 'Cantidad por página'; 
    
    this._service.mostrar();
    //this._service.mostrarpermiso(localStorage.getItem('rol'),3);
    // this._service.responsepermiso$.subscribe(r=>{
    //  this.permisos = r[0];
    // })

  

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  busqueda(){
    this._service.mostrar(this.buscar);
  }

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }
  crear() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this._dialog.open(InsertUpdateComponent,dialogConfig);
    this._service.inicializarForm();
  }
  excel() {
    let data:any[] = [];
    this._service.mostrar(this.buscar)
  
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    XLSX.writeFileXLSX(workbook, 'tipodireccion.xlsx', {});
  }
  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this._dialog.open(InsertUpdateComponent,dialogConfig);
    this._service.popForm(item);
  }

  eliminar(id: number) {

    this._sweet.mensajeConConfirmacion('Eliminar', '¿Desea eliminar el registro?', 'warning').
      then((result) => {
        if (result) {
          this._service.eliminar(id).subscribe(resp => {
            this._service.mostrar(this.buscar);
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'TIPO DIRECCION', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'TIPO DIRECCION',
              }
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple('Eliminado correctamente', 'DIRECCION', 'success');
            }
          })
        }
      })

  }

  impo() {
   let date = new Date();
    let url = '../../../assets/logo.jpg';
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5>Agrocomercial "Libertad"</h5>
  <h5>Listado de Tipo direccion</h5>
  <h6>${date.toLocaleString()}</h6>
  </div>
  </div><br>`;

    printJS({
      printable: 'reporte2',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style: '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Permisos',
      font_size: '10pt',
      ignoreElements: ['d']
    })
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'ROLES'
    };
     this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
