import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ArticulosPackageService } from 'src/app/pages/inventario/articulos/articulos-package.service';
import { VentasPackageService } from '../ventas-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  buscar: any = '';
  campo: any[] = ['NOM_CATEGORIA','NOMBRE_ARTICULO', 'DESCRIPCION'];

  constructor(
    private _dialog: DialogRef<ProductosComponent>,
    public _service: ArticulosPackageService,
    public _ventasservice:VentasPackageService,
    private _sweet: SweetAlertService,
  ) {
    this._service.mostrar();
  }

  pasarproductos(e:any){

    this._ventasservice.register.get('PRECIO_VENTA').setValue(e.PRECIO_COMPRA);
    this._ventasservice.register.get('COD_ARTICULO').setValue(e.COD_ARTICULO);
    this._ventasservice.register.get('STOCK').setValue(e.EXISTENCIA);
    this._ventasservice.nombreproducto = e.NOMBRE_ARTICULO
    this._dialog.close()
  }
}
