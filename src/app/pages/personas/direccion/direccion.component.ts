import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent {
  direccion:any[] = [];
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

  constructor(//public _service: PackageTipoTelefonoService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private route: ActivatedRoute, private http: HttpClient) {

    let id: string = this.route.snapshot.paramMap.get('id');
    this.http.get(environment.url + 'direccion/' + id).subscribe((resp:any) => {
      console.log('object');
      console.log(resp.data);
      console.log('object');

      this.direccion = resp.data;
      
     
    });
    console.log(id);
   

    let params = {
      operacion: 'INGRESO',
      fecha: new Date(),
      idusuario: Number(localStorage.getItem('user')),
      tabla: 'TIPO DIRECCION'
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
      tabla: 'DIRECCION'
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
