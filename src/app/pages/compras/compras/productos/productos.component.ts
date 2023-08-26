import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ArticulosPackageService } from 'src/app/pages/inventario/articulos/articulos-package.service';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ComprasPackageService } from '../compras-package.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {

  buscar: any = '';
  campo: any[] = ['NOM_CATEGORIA','NOMBRE_ARTICULO', 'DESCRIPCION'];

  constructor(
    private _dialog: DialogRef<ProductosComponent>,
    public _service: ArticulosPackageService,
    public _productosservice:ComprasPackageService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar();
  }

  pasarproductos(e:any){
    this._productosservice.register.get('PRECIO_COMPRA').setValue(e.PRECIO_COMPRA);
    this._productosservice.register.get('COD_ARTICULO').setValue(e.COD_ARTICULO);
    this._productosservice.nombreproducto = e.NOMBRE_ARTICULO
    this._dialog.close()
  }

  salir(){
    this._dialog.close()
  }
}
