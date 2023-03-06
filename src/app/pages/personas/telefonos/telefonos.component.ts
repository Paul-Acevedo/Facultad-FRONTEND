import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as printJS from 'print-js';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css'],
})
export class TelefonosComponent {
  telefonos:any[] = [];
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['TIPO_TELEFONO'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any;//paso //2

  permisos:any = [];

  constructor(//public _service: PackageTipoTelefonoService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private route: ActivatedRoute, private http: HttpClient ,   private paginator: MatPaginatorIntl
    ) {
      paginator.itemsPerPageLabel = 'Cantidad por página'; 
    let id: string = this.route.snapshot.paramMap.get('id');
    this.http.get(environment.url + 'telefono/' + id).subscribe((resp:any) => {
      console.log('object');
      console.log(resp.data);
      console.log('object');

      this.telefonos = resp.data;
      this.telefonos.length;
      console.log(this.telefonos.length);
    });
    console.log(id);
   

    let params = {
      operacion: 'INGRESO',
      fecha: new Date(),
      idusuario: Number(localStorage.getItem('user')),
      tabla: 'TIPO TELEFONO'
    }
    this._bitacora.crear(params).subscribe();
  }

 

  

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    let params = {
      operacion: 'SALIO',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'TELEFONO'
    }
    this._bitacora.crear(params).subscribe();
  }

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }
  crear() {

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "20%";
    // this._dialog.open(InsertUpdateComponent);
    // this._service.inicializarForm();
  }

  editar(item: any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "25%";
    // this._dialog.open(InsertUpdateComponent);
    // this._service.popForm(item);
  }

  eliminar(id: number) {

    // this._sweet.mensajeConConfirmacion('Eliminar', '¿Desea eliminar el registro?', 'warning').
    //   then((result) => {
    //     console.log(result);
    //     if (result) {
    //       this._service.eliminar(id).subscribe(resp => {
    //         this._service.mostrar();
    //         if (!resp.ok) {
    //           this._sweet.mensajeSimple('Ocurrio un error', 'TIPO TELEFONO', 'error');
    //         } else {
    //           let params = {
    //             operacion: 'ELIMINO',
    //             fecha: new Date(),
    //             idusuario: localStorage.getItem('user'),
    //             tabla: 'TIPO TELEFONO',
    //           }
    //           this._bitacora.crear(params).subscribe();
    //           this._sweet.mensajeSimple('Eliminado correctamente', 'ROLES', 'success');
    //         }
    //       })
    //     }
    //   })

  }

 


}
