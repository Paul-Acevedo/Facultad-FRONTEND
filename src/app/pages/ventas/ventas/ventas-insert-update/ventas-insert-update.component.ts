import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { BitacoraPackageService } from 'src/app/pages/seguridad/bitacora/bitacora-package.service';
import { ParametrosInsertUpdateService } from 'src/app/pages/seguridad/parametros/parametros-insert-update.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ClientesPackageService } from '../../clientes/clientes-package.service';
import { VentasPackageService } from '../ventas-package.service';
import {map,startWith}from 'rxjs/operators'
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ventas-insert-update',
  templateUrl: './ventas-insert-update.component.html',
  styleUrls: ['./ventas-insert-update.component.css']
})
export class VentasInsertUpdateComponent implements OnInit {

  nombreproducto: string;
  total: any = 0;
  idproducto: number;
  totalbruto: any = 0;
  isv:number=0;

  pageSize: number = 25;
  pageSizeOptions: number[] = [25,50,100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  options: any[] = []
  filteredClientes: Observable<any[]>;

  optionsarticulo:any[] = [];
  filteredArticulos: Observable<any[]>;

  constructor(public _service: VentasPackageService,
    public dialogref: MatDialogRef<VentasInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public _clientes: ClientesPackageService,
    private _param: ParametrosInsertUpdateService
  ) {
    this._clientes.mostrar();
    this._service.mostrarClientes();
    this._service.mostrararticulos();
    //this._service.mostrararclientes();
    this._service.register.get('TOTALBRUTO').disable();
    this._service.register.get('COS_UNITARIO').disable();
    this._service.register.get('TOTALFINAL').disable();
  }
  i = 1;

  ngOnInit(): void {

    this._service.mostrarClientes();
    this._service.responses$.subscribe(r => {
      this.options = r
    })

    this.filteredClientes = this._service.register.get('COD_CLIENTE').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterClientes(name as string) : this.options.slice();
      }),
    );

    this._service.mostrararticulos();
    this._service.responsearticulos$.subscribe(r=>{
      this.optionsarticulo = r;
    })

    
    this.filteredArticulos = this._service.register.get('COD_ARTICULO').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterArticulo(name as string) : this.optionsarticulo.slice();
      }),
    );

    this._param.mostrar();
   
    this._param.response$.subscribe(r => {
      this.isv = Number(r[4]?.VALOR);
      console.log(r);
      console.log(this.isv);
    })
    this._service.register.get('CANTIDAD').valueChanges.subscribe(value => {
      let precio = this._service.register.get('COS_UNITARIO').value;
      let total = value * precio;
      let isv = total * this.isv;
      let totalfinal = total + isv;
      this._service.register.get('TOTALBRUTO').setValue(total);
      this._service.register.get('TOTALFINAL').setValue(totalfinal);
      if (value > this._service.register.get('STOCK').value) {
        this._service.register.get('TOTALBRUTO').setValue(0);
        this._service.register.get('TOTALFINAL').setValue(0);
        this._service.register.get('CANTIDAD').setValue(0);
        this._sweet.mensajeSimple('No hay stock suficiente', 'VENTAS', 'warning');
      }
      //  this.nombreproducto = value;
    });
  }

  modelChanged(e) {

    console.log(e.option.value);
    this.nombreproducto=e.option.value.NOM_ART

    this._service.mostrararticulosid(e.option.value.COD_ARTICULO);
    this._service.responsearticulosid$.subscribe(r => {
      this._service.register.get('COS_UNITARIO').setValue(r[0]?.PREC_VENTA);
      this._service.register.get('STOCK').setValue(r[0]?.EXISTENCIA);
      this.nombreproducto = r[0]?.NOM_ART;
      this.idproducto = r[0]?.COD_ART;
    });
  }

  get validateOpinion() {
    return this._service.register.controls;
  }


  eliminar(item:any){
    console.log(item);
    let data = this._service.productos.filter(i=>
       i.id != item.id
    );
    this._service.productos = data;
    this.total = this.total - item.total;
  }

  agregar() {
    if (this._service.register.valid) {

      // if( this._service.productos[0].codproducto)
      //console.log(this._service.productos.codproducto );
      this._service.productos.push({
        id: this.i++,
        cantidad: this._service.register.get('CANTIDAD').value,
        producto: this.nombreproducto,
        codproducto: this._service.register.value.COD_ARTICULO.COD_ARTICULO,
        precio: this._service.register.get('COS_UNITARIO').value,
        total: this._service.register.get('TOTALFINAL').value
      });
      this.totalbruto = this.totalbruto + this._service.register.get('TOTALBRUTO').value;
      this.total = this.total + this._service.register.get('TOTALFINAL').value;

      this._service.register.get('CANTIDAD').setValue('');
      this._service.register.get('COD_ARTICULO').setValue('');
      this._service.register.get('COS_UNITARIO').setValue('');

    } else {
      this._sweet.mensajeSimple('Seleccione todos los campos', 'VENTAS', 'warning');
    }
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
 

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  guardar() {
  
      // crea usuario
      let datos = this._service.register.value;
      console.log(this.isv)
      let params = {
        codcliente: datos.COD_CLIENTE.COD_CLIENTE,
        subtotal: this.totalbruto,
        total: this.total,
        productos: this._service.productos,
        user: localStorage.getItem('user'),
        isv:this.isv
      };

    console.log(params);
      //console.log(params)

      this._service.crear(params).subscribe(resp => {
        console.log(resp)
        if (!resp.ok) {
          this._sweet.mensajeSimple('Ocurrio un error', 'VENTAS', 'warning');
          this._service.productos = [];
        } else {
          this._sweet.mensajeSimple('Creado correctamente', 'VENTAS', 'success');
          this._service.productos = [];
          let params = {
            operacion: 'INSERTO',
            fecha: new Date(),
            idusuario: localStorage.getItem('user'),
            tabla: 'VENTAS',
          }
          this._bitacora.crear(params).subscribe();
        }
        this._service.mostrar();
      });
      this.cerrarmodal();

    }
  
    
  displayClientes(user: any): string {
    return user && user.PRIMER_NOMBRE ? user.PRIMER_NOMBRE : '';
  }

  private _filterClientes(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.PRIMER_NOMBRE.toLowerCase().includes(filterValue));
  }
  

  displayArticulo(user: any): string {
    return user && user.NOM_ART ? user.NOM_ART : '';
  }

  private _filterArticulo(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.optionsarticulo.filter(option => option.NOM_ART.toLowerCase().includes(filterValue));
  }


}
