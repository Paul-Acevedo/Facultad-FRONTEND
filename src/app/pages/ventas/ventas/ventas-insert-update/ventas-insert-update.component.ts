import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { ParametrosInsertUpdateService } from 'src/app/pages/seguridad/parametros/parametros-insert-update.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ClientesPackageService } from '../../clientes/clientes-package.service';
import { VentasPackageService } from '../ventas-package.service';
import { map, startWith } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Dialog } from '@angular/cdk/dialog';
import { InsertUpdatePagVentasComponent } from '../insert-update-pago/insert-update-pago.component';

@Component({
  selector: 'app-ventas-insert-update',
  templateUrl: './ventas-insert-update.component.html',
  styleUrls: ['./ventas-insert-update.component.css'],
})

export class VentasInsertUpdateComponent implements OnInit {
  nombreproducto: string;
  total: any = 0;
  idproducto: number;
  totalbruto: any = 0;
  isv: number = 0;

  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  optionsarticulo: any[] = [];
  filteredArticulos: Observable<any[]>;

  constructor(
    public _service: VentasPackageService,
    private _sweet: SweetAlertService,
    public _clientes: ClientesPackageService,
    private _param: ParametrosInsertUpdateService,
    private _dialog: Dialog
  ) {
  

    this._service.productos = [];
    this._clientes.mostrar();
    this._service.mostrarClientes();
    this._service.mostrararticulos();
    this._service.register.get('PRECIO_VENTA').disable();
    this._service.register.get('TOTALBRUTO').disable();
    this._service.register.get('STOCK').disable();
    this._service.register.get('TOTALFINAL').disable();
    this._service.register.get('ISV').disable();

    
  }
  i = 1;

  ngOnInit(): void {

    this._service.mostrararticulos();
    this._service.responsearticulos$.subscribe((r) => {
      this.optionsarticulo = r;
    });

    this.filteredArticulos = this._service.register
      .get('COD_ARTICULO')
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name
            ? this._filterArticulo(name as string)
            : this.optionsarticulo.slice();
        })
      );

    this._param.mostrar();


    this._param.response$.subscribe((r) => {
      this.isv = Number(r[4]?.VALOR);
    });

    this._service.register.get('CANTIDAD').valueChanges.subscribe((value) => {
      let precio = this._service.register.get('PRECIO_VENTA').value;
      let total = value * precio;
      let isv = total * this.isv;

     

      let totalfinal = total + isv ;
      this._service.register.get('TOTALBRUTO').setValue(total);
      this._service.register.get('TOTALFINAL').setValue(totalfinal);
      this._service.register.get('ISV').setValue(isv);
     


      if (value > this._service.register.get('STOCK').value) {
        this._service.register.get('TOTALBRUTO').setValue(0);
        this._service.register.get('TOTALFINAL').setValue(0);
        this._service.register.get('CANTIDAD').setValue(0);
        this._service.register.get('ISV').setValue(0);
       

        this._sweet.mensajeSimple(
          'No hay stock suficiente',
          'VENTAS',
          'warning'
        );
      }
      //  this.nombreproducto = value;
    });
  }

  modelChanged(e:any) {
    this.nombreproducto = e.option.value.NOMBRE_ARTICULO;
    this._service.register
      .get('PRECIO_VENTA')
      .setValue(e.option.value.PRECIO_VENTA);
    this._service.register.get('STOCK').setValue(e.option.value.EXISTENCIA);
  }

  get validateOpinion() {
    return this._service.register.controls;
  }

  eliminar(item: any) {
    let data = this._service.productos.filter((i) => i.id != item.id);
    this._service.productos = data;
    this._service.total = this._service.total - item.total;
    this._service.subtotal = this._service.subtotal - item.subtotal;
    this._service.isv = this._service.isv - item.isv;

    if(this._service.productos.length == 0){
      this._service.productos = [];
      this._service.total = 0;
      this._service.subtotal = 0 
      this._service.isv = 0
    }
  }

  agregar() {
    if (this._service.register.valid) {
      
      this._service.productos.push({
        id: this.i++,
        cantidad: this._service.register.get('CANTIDAD').value,
        producto: this.nombreproducto,
        codproducto: this._service.register.value.COD_ARTICULO.COD_ARTICULO,
        precio: this._service.register.get('PRECIO_VENTA').value,
        subtotal: this._service.register.get('TOTALBRUTO').value,
       
        total: this._service.register.get('TOTALFINAL').value,
      });
  
      this._service.subtotal =   this._service.subtotal + this._service.register.get('TOTALBRUTO').value;
      this._service.total = this._service.total + this._service.register.get('TOTALFINAL').value;
       this._service.isv = this._service.isv + this._service.register.get('ISV').value;

      this._service.register.get('CANTIDAD').setValue('');
      this._service.register.get('COD_ARTICULO').setValue('');
      this._service.register.get('PRECIO_VENTA').setValue('');
    } else {
      this._sweet.mensajeSimple(
        'Seleccione todos los campos',
        'VENTAS',
        'warning'
      );
    }
  }

  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  //cerrarmodal

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  pagar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(InsertUpdatePagVentasComponent);
  }

  displayArticulo(user: any): string {
    return user && user.NOMBRE_ARTICULO ? user.NOMBRE_ARTICULO : '';
  }

  private _filterArticulo(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.optionsarticulo.filter((option) =>
      option.NOMBRE_ARTICULO.toLowerCase().includes(filterValue)
    );
  }
}
