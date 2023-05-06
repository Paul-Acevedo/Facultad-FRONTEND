import { Component } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { DialogRef } from '@angular/cdk/dialog';
import { ComprasPackageService } from '../compras-package.service';
import { ProveedoresPackageService } from '../../proveedores/proveedores-package.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Confirm } from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-update-pago',
  templateUrl: './insert-update-pago.component.html',
  styleUrls: ['./insert-update-pago.component.css'],
})
export class InsertUpdatePagoComponent {
  options: any[] = [];
  filteredProveedor: Observable<any[]>;

  constructor(
    public _dialgo: DialogRef<InsertUpdatePagoComponent>,
    public _service: ComprasPackageService,
    public _proveedor: ProveedoresPackageService,
    private _sweet: SweetAlertService,
    private _route:Router
  ) {
    this._service.mostrararproveedores();
    this._service.responseproveedores$.subscribe((r) => {
      this.options = r;
    });

    this.filteredProveedor = this._service.pago
      .get('COD_PERSONA')
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          console.log(name);
          return name
            ? this._filterProveedor(name as string)
            : this.options.slice();
        })
      );
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


  cerrarmodal(){
    this._dialgo.close();
  }
  
  guardar() {
    // crea usuario
    let datos = this._service.register.value;
    let desc = this._service.pago.value.COD_PERSONA.COD_PERSONA
    let params = {
      codproveedor: this._service.pago.value.COD_PERSONA.COD_PERSONA,
      total: this._service.total,
      productos: this._service.productos,
      user: localStorage.getItem('user'),
      isv: (this._service.total * this._service.isv),
    };

    this._service.crear(params).subscribe((resp) => {
      console.log(resp);
      if (!resp.ok) {
        this._sweet.mensajeSimple('Ocurrio un error', 'COMPRAS', 'warning');
      } else {
        this._sweet.mensajeSimple('Creado correctamente', 'COMPRAS', 'success');
        let params = {
          operacion: 'INSERTO',
          fecha: new Date(),
          idusuario: 1,
          tabla: 'COMPRAS',
        };

        let datos: any = [];
        console.log(this._service.productos);

        for (var i = 0; i < this._service.productos.length; i++) {
          datos.push([
            this._service.productos[i].producto,
            this._service.productos[i].precio,
            this._service.productos[i].cantidad,
          ]);
        }
      }
      this._service.mostrar();
      this._dialgo.close();
      this._route.navigate(['/compras/compras']);
      
      // this._service.productos = [];
      ///  this.cerrarmodal();
    });
  }
}
