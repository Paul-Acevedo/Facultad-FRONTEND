import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment.prod';
import { InsertUpdateComponent } from './insert-update/insert-update.component';
import { PackageDireccionService } from './package-direccion.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent {
 
  telefonos: any[] = [];
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

  usuario: any; //paso //2

  permisos: any = [];

  constructor(
    //public _service: PackageTipoTelefonoService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private paginator: MatPaginatorIntl,
    public _service: PackageDireccionService
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.id = this.route.snapshot.paramMap.get('id');

    this._service.mostrar()

    let params = {
      operacion: 'INGRESO',
      fecha: new Date(),
      idusuario: Number(localStorage.getItem('user')),
      tabla: 'DIRECCION',
    };
    this._bitacora.crear(params).subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    let params = {
      operacion: 'SALIO',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'DIRECCION',
    };
    this._bitacora.crear(params).subscribe();
  }

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }
  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(InsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    this._dialog.open(InsertUpdateComponent);
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
              this._sweet.mensajeSimple('Ocurrio un error', ' DIRECCION', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'DIRECCION',
              }
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple('Eliminado correctamente', 'DIRECCION', 'success');
            }
          })
        }
      })
  }
}
