import { Component } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import * as printJS from 'print-js';
import { CaiService } from './cai.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { InsertUpdateCaiComponent } from './insert-update-cai/insert-update-cai.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cai',
  templateUrl: './cai.component.html',
  styleUrls: ['./cai.component.css']
})
export class CaiComponent {

  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50,100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['CAI'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any;//paso //2
  i: number = 0;
permisos:any = [];
  constructor(public _service: CaiService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
    ) {
      paginator.itemsPerPageLabel = 'Cantidad por página'; 
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'),10);
    this._service.responsepermiso$.subscribe(r=>{
     this.permisos = r[0];
    })


  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
 
  }

  excel() {
    
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
    dialogConfig.width = "15%";
    this._dialog.open(InsertUpdateCaiComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "15%";
    this._dialog.open(InsertUpdateCaiComponent);
    this._service.popForm(item);
  }

  eliminar(id: number) {

    this._sweet.mensajeConConfirmacion('Eliminar', '¿Desea eliminar el registro?', 'warning').
      then((result) => {
        console.log(result);
        if (result) {
          this._service.eliminar(id).subscribe(resp => {
            this._service.mostrar();
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'PARAMETROS', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'PARAMETROS',
              }
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple('Eliminado correctamente', 'PARAMETROS', 'success');
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
  <h5>Agrocomercial "Libertad"</h5>
  <h5>Listado de cai</h5>
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
      documentTitle: 'Objetos',
      font_size: '10pt',
      ignoreElements: ['d']
    })
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'CAI'
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
