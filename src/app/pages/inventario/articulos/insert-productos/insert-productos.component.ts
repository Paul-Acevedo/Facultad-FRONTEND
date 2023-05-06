import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { CategoriasPackageService } from '../../categorias/categorias-package.service';
import { ArticulosPackageService } from '../articulos-package.service';

@Component({
  selector: 'app-insert-productos',
  templateUrl: './insert-productos.component.html',
  styleUrls: ['./insert-productos.component.css'],
})
export class InsertProductosComponent {
  constructor(
    public _service: ArticulosPackageService,
    public dialogref: MatDialogRef<InsertProductosComponent>,
    private _sweet: SweetAlertService,
    public _aticuo: ArticulosPackageService,
    public _cat: CategoriasPackageService
  ) {
    this._cat.mostrar();
  }

  get validateOpinion() {
    return this._service.register.controls;
  }

  ngOnInit(): void {}

  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  //cerrarmodal
  cerrarmodal() {
    this.dialogref.close();
  }

  guardar() {
    if (this._service.registerr.valid) {
      let datos = this._service.registerr.value;

      let params = {
        cod: datos.COD_ARTICULO,
        cantidad: datos.CANTIDAD,
        descripcion: datos.DESCRIPCION,
      };

      console.log(params);
      this._service.crearaumenta(params,'articulosaumenta').subscribe((resp) => {
        console.log(resp);
        if (!resp.ok) {
          this._sweet.mensajeSimple('Ocurrio un error', 'ARTICULOS', 'warning');
        } else {
          this._sweet.mensajeSimple(
            'Guardado correctamente',
            'ARTICULOS',
            'success'
          );
        }
        this._service.mostrar();
      });
      this.cerrarmodal();
    }
  }
}
