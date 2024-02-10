import { Component } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { SolicitudService } from '../../solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
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

expediente:any = [];
id:any = []
l:any = environment.url
constructor(
  public _service: SolicitudService,
  private _dialog: MatDialog,
  private _bitacora: GlobalService,
  private _sweet: SweetAlertService,
  private paginator: MatPaginatorIntl,
  public _http:HttpClient,
  private route: ActivatedRoute

) {
  
  paginator.itemsPerPageLabel = 'Cantidad por página';
  this._service.mostrar();
  this._service.mostrarpermiso(localStorage.getItem('rol'), 2);
  this._service.responsepermiso$.subscribe((r) => {
    this.permisos = r[0];
  });

  this.route.queryParams.subscribe((params:any) => { 
        this._http.get(`http://localhost:3000/upload/${params.id}`).subscribe((resp:any)=>{
          this.expediente = resp.data;
          console.log(this.expediente );
        })
  })

}

busqueda(){
  this._service.mostrar(this.buscar);

}

ngOnInit(): void {
  let solicitud: any = JSON.parse(localStorage.getItem('usuario')!);
}

ngOnDestroy(): void {}

cambioPagina(e: PageEvent) {
  this.d = e.pageIndex * e.pageSize;
  this.h = this.d + e.pageSize;
}
crear() {

}

ruta(r:string){
  return this._http.get(environment.url+`descargar-archivo/${r}`, { responseType: 'blob' });
}

descargarArchivo(nombreArchivo: string) {
  this.ruta(nombreArchivo).subscribe((data: Blob) => {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  });
}


descargar(){

}

editar(id){

}

}
