import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ComprasPackageService } from '../compras-package.service';
import {
  debounceTime,
  tap,
  switchMap,
  finalize,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ParametrosInsertUpdateService } from 'src/app/pages/seguridad/parametros/parametros-insert-update.service';
import { InsertUpdatePagoComponent } from '../insert-update-pago/insert-update-pago.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-compras-insert-update',
  templateUrl: './compras-insert-update.component.html',
  styleUrls: ['./compras-insert-update.component.css'],
})
export class ComprasInsertUpdateComponent implements OnInit {
  nombreproducto: string;
  total: any = 0;
  idproducto: number;
  codproveedor: any = 0;
  isv: number = 0;
  searchArticlesCtrl = new FormControl();
  filteredArticles: any;
  selectedArticle: any;

  options: any[] = [];
  filteredProveedor: Observable<any[]>;

  optionsarticulo: any[] = [];
  filteredArticulos: Observable<any[]>;

  constructor(
    public _service: ComprasPackageService,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    private _param: ParametrosInsertUpdateService,
    private _dialog: Dialog
  ) {
    this._service.mostrararticulos();

    this._service.register.get('PRECIO_COMPRA').disable();
    this._service.register.get('SUB_TOTAL').disable();
    // this._service.register.get('TOTALFINAL').disable();
  }
  i = 1;
  get validateOpinion() {
    return this._service.register.controls;
  }

  pagar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(InsertUpdatePagoComponent);
  }

  ngOnInit(): void {
  

    //TODO: sirve para filtrador articulos

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

    // TODO: Termina

    this._param.mostrar();

    this._param.response$.subscribe((r) => {
      console.log(r);
      this.isv = Number(r[4]?.VALOR);
    });

    this._service.register.get('CANTIDAD').valueChanges.subscribe((value) => {
      console.log('object');
      console.log(value);
      let precio = this._service.register.get('PRECIO_COMPRA').value;
      //  let descuento = this._service.register.get('DESCUENTO').value;
      //  let impuesto = this._service.register.get('IMPUESTO').value;
      let subtotal = value * precio;
      //    descuento = subtotal * descuento;
      //    impuesto = subtotal * impuesto;
      // let totalfinal = total + isv;
      this._service.register.get('SUB_TOTAL').setValue(subtotal);
      // this._service.register.get('TOTALFINAL').setValue(totalfinal);
      //  this.nombreproducto = value;
    });
  }

  modelChanged(e) {
    this.nombreproducto = e.option.value.NOMBRE_ARTICULO;
    this._service.register
      .get('PRECIO_COMPRA')
      .setValue(e.option.value.PRECIO_COMPRA);
    //   this.nombreproducto = r[0]?.NOM_ART;
    //   this.idproducto = r[0]?.COD_ART;
    //});
  }

  agregar() {
    if (this._service.register.valid) {
      this._service.productos.push({
        id: this.i++,
        cantidad: this._service.register.get('CANTIDAD').value,
        producto: this.nombreproducto,
        codproducto: this._service.register.value.COD_ARTICULO.COD_ARTICULO,
        precio: this._service.register.get('PRECIO_COMPRA').value,
        total: this._service.register.get('SUB_TOTAL').value,
      });
      this._service.total = this._service.total + this._service.register.get('SUB_TOTAL').value;

      this._service.register.get('CANTIDAD').setValue('');
      this._service.register.get('COD_ARTICULO').setValue('');
      this._service.register.get('PRECIO_COMPRA').setValue('');
    } else {
      this._sweet.mensajeSimple(
        'Seleccione todos los campos',
        'COMPRAS',
        'warning'
      );
    }
  }

  eliminar(item: any) {
    let data = this._service.productos.filter((i) => i.id != item.id);

    this._service.productos = data;
    this.total = this.total - item.total;
  }

  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  //cerrarmodal
  cerrarmodal() {
    //this.dialogref.close();
  }

  displayProveedor(user: any): string {
    return user && user.PRIMER_NOMBRE ? user.PRIMER_NOMBRE : '';
  }

  private _filterProveedor(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.PRIMER_NOMBRE.toLowerCase().includes(filterValue)
    );
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
