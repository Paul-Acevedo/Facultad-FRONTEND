import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { CategoriasPackageService } from '../../categorias/categorias-package.service';
import { ArticulosPackageService } from '../articulos-package.service';


@Component({
  selector: 'app-articulos-insert-update',
  templateUrl: './articulos-insert-update.component.html',
  styleUrls: ['./articulos-insert-update.component.css']
})
export class ArticulosInsertUpdateComponent implements OnInit {


  constructor(public _service: ArticulosPackageService,
    public dialogref: MatDialogRef<ArticulosInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public _aticuo: ArticulosPackageService,
    public _cat: CategoriasPackageService
  ) {
    this._cat.mostrar();
  }

  get validateOpinion() {
    return this._service.register.controls;
  }

  ngOnInit(): void {
  }

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

    if (this._service.register.valid) {

      if (!this._service.register.get('COD_ARTICULO')?.value) {

        let datos = this._service.register.value;

        if (datos.PREC_COMPRA == 0 || datos.PREC_VENTA == 0) {
          this._sweet.mensajeSimple('Precio de venta y compra deben de ser mayor a cero', 'ARTICULOS', 'warning');
        } else {

          let params = {
            categoria: datos.COD_CATEGORIA,
            articulo: datos.NOMBRE_ARTICULO,
            pcompras: datos.PRECIO_COMPRA,
            pventas: datos.PRECIO_VENTA,
            descripcion: datos.DESCRIPCION
          };





          this._service.crear(params).subscribe(resp => {
            console.log(resp)
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'ARTICULOS', 'warning');
            } else {
              this._sweet.mensajeSimple('Creado correctamente', 'ARTICULOS', 'success');
              let params = {
                operacion: 'INSERTO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'ARTICULOS',
              }
              this._bitacora.crear(params).subscribe();
            }
            this._service.mostrar();
          });
          this.cerrarmodal();
        }
      } else {
        // actualiza ususario
        let datos = this._service.register.value;
        if (datos.PREC_COMPRA == 0 || datos.PREC_VENTA == 0) {
          this._sweet.mensajeSimple('Precio de venta y compra deben de ser mayor a cero', 'ARTICULOS', 'warning');
        }else{
        let params = {
          id: datos.COD_ARTICULO,
          categoria: datos.COD_CATEGORIA,
          articulo: datos.NOMBRE_ARTICULO,
          pcompras: datos.PRECIO_COMPRA,
          pventas: datos.PRECIO_VENTA,
          descripcion: datos.DESCRIPCION
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          this._sweet.mensajeSimple('Actualizado correctamente', 'ARTICULOS', 'success');
          let params = {
            operacion: 'ACTUALIZO',
            fecha: new Date(),
            idusuario: localStorage.getItem('user'),
            tabla: 'ARTICULOS',
          }

          this._bitacora.crear(params).subscribe();
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
      }
    }
  }

}
