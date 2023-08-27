import { Component } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { Confirm } from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { VentasPackageService } from '../ventas-package.service';
import { ClientesPackageService } from '../../clientes/clientes-package.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-update-pago',
  templateUrl: './insert-update-pago.component.html',
  styleUrls: ['./insert-update-pago.component.css'],
})
export class InsertUpdatePagVentasComponent {
  options: any[] = [];
  filteredClientes: Observable<any[]>;
  opcion: string;
  buscar: any = '';
  campo: any[] = ['PRIMER_NOMBRE', 'TIPO'];
  cai: boolean = false;
  datoscai: any = [];
  nombrecliente: string;

  constructor(
    public _dialgo: DialogRef<InsertUpdatePagVentasComponent>,
    public _service: VentasPackageService,
    public _cliente: ClientesPackageService,
    private _sweet: SweetAlertService,
    private _route: Router
  ) {
    this._service.mostrarClientes();
    this._service.mostrarCaiEstado();

    this._service.responsecai$.subscribe((r) => {
      this.datoscai = r[0];
    });

    let total = this._service.total;
    let antesimpuesto = this._service.isv;

    this._service.pago.get('DESCUENTO').valueChanges.subscribe((value) => {
      if (value == '') {
        this._service.total = total;
        this._service.descuento = 0;
      } else {
        //si hay descuento

        let descuento = this._service.subtotal * value;
        let subtotal = this._service.subtotal - descuento;
        let impuesto = subtotal * this._service.isvPorcentaje;

        console.log('descuento', descuento); //20
        console.log('subtotal', this._service.subtotal);
        console.log('isv', impuesto);

        this._service.isv = impuesto;
        //this._service.subtotal = subtotal;
        this._service.descuento = descuento;
        this._service.total = subtotal + impuesto;

        console.log(descuento);

        // console.log('isv',this._service.isv);
        // let descuento = subtotal * value;
        // subtotal = subtotal - descuento;
        // let impuesto = subtotal * antesimpuesto;

        //         console.log(subtotal);
        //         console.log(descuento);
        // console.log(subtotal);
        // console.log(impuesto);
        // this._service.descuento = 0;
        // this._service.descuento = this._service.subtotal * value;
        // this._service.total = this._service.total - this._service.descuento;
      }
    });
  }

  validateInput(event: KeyboardEvent): void {
    const inputChar = event.key;
    const allowedCharacters = /[0-9.\b]/;
    if (!allowedCharacters.test(inputChar) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  cerrarmodal() {
    this._dialgo.close();
  }

  displayClientes(user: any): string {
    return user && user.PRIMER_NOMBRE ? user.PRIMER_NOMBRE : '';
  }

  //cambiar estado de cai
  cambiarcai() {
    this.cai = !this.cai;
  }

  pasarproductos(e: any) {
    this._service.pago.get('COD_PERSONA').setValue(e.COD_PERSONA);
    this.opcion = e.COD_PERSONA;
    this.nombrecliente = e.PRIMER_NOMBRE + ' ' + e.PRIMER_APELLIDO;
  }

  get validator() {
    return this._service.pago.controls;
  }

  guardar() {
    if (!this.cai) {
      this.datoscai = [];
    }

    let desc = this._service.pago.value.DESCUENTO;
    desc = this._service.total * desc;

    let params = {
      codcliente: this._service.pago.value.COD_PERSONA,
      subtotal: this._service.subtotal,
      total: this._service.total,
      productos: this._service.productos,
      user: localStorage.getItem('user'),
      isv: this._service.isv,
      desc: this._service.descuento,
      fecha_limite: this.datoscai.FECHA_LIMITE,
      rango_desde: this.datoscai.RANGO_DESDE,
      rango_hasta: this.datoscai.RANGO_HASTA,
      cai: this.datoscai.CAI,
      factura_sar: this.datoscai.FACTURA_SAR,
    };

    this._service.crear(params).subscribe((resp) => {
      if (!resp.ok) {
        this._sweet.mensajeSimple('Ocurrio un error', 'VENTAS', 'warning');
        this._service.productos = [];
        this._service.total = 0;
        this._service.descuento = 0;
        this._service.isv = 0;
        this._service.subtotal = 0;
      } else {
        this._sweet.mensajeSimple('Creado correctamente', 'VENTAS', 'success');

        Confirm.show(
          'Confirmar',
          '¿Desea imprimir factura?',
          'Si',
          'No',
          () => {
            let datos: any = [];
            for (var i = 0; i < this._service.productos.length; i++) {
              datos.push([
                this._service.productos[i].producto,
                this._service.productos[i].cantidad,
                this._service.productos[i].precio,
                this._service.productos[i].subtotal,
              ]);
            }
            const doc = new jsPDF();

            autoTable(doc, {
              body: [
                [
                  {
                    content:
                      'AGROCOMERCIAL " La libertad "' +
                      '\nCesar A. Andino    R.T.N 03061953000851' +
                      '\nBo. La flor, La libertad, Comayagua' +
                      '\n Correo Electrónico: agrocomerciallibertad@gmail.com' +
                      '\n Tel: 2724-0568 - 97809709',
                    styles: {
                      halign: 'center',
                      fontSize: 16,
                      // textColor: '#ffffff',
                    },
                  },
                  // {
                  //   content: 'Factura',
                  //   styles: {
                  //     halign: 'center',
                  //     fontSize: 20,
                  //     textColor: '#ffffff',
                  //   },
                  // },
                ],
              ],
              theme: 'plain',
              // styles: {
              //   fillColor: '#fff',
              // },
            });

            autoTable(doc, {
              body: [
                [
                  {
                    content:
                      `CAI: ${this.datoscai.CAI || ''}` +
                      `\nFACTURA SAR: ${this.datoscai.FACTURA_SAR || ''} ` +
                      `\nFECHA: ${new Date()}`,
                    styles: {
                      halign: 'right',
                    },
                  },
                ],
              ],
              theme: 'plain',
            });

            autoTable(doc, {
              body: [
                [
                  {
                    content:
                      'Codigo factura' +
                      '\nVenta: Efectivo' +
                      '\nNombre Cliente: ' +
                      this.nombrecliente,
                    // '\nBilling Address line 2' +
                    // '\nZip code - City' +
                    // '\nCountry',
                    styles: {
                      halign: 'left',
                    },
                  },
                ],
              ],
              theme: 'plain',
            });

            autoTable(doc, {
              body: [
                [
                  {
                    content: 'Productos',
                    styles: {
                      halign: 'left',
                      fontSize: 14,
                    },
                  },
                ],
              ],
              theme: 'plain',
            });

            autoTable(doc, {
              head: [['Producto', 'Cantidad', 'Precio', 'subtotal']],
              body: datos,
              theme: 'striped',
              headStyles: {
                fillColor: '#343a40',
              },
            });

            autoTable(doc, {
              body: [
                [
                  {
                    content: 'Sub total:',
                    styles: {
                      halign: 'right',
                    },
                  },
                  {
                    content: 'L. ' + Number(this._service.subtotal).toFixed(2),
                    styles: {
                      halign: 'right',
                    },
                  },
                ],

                [
                  {
                    content: 'Descuento:',
                    styles: {
                      halign: 'right',
                    },
                  },
                  {
                    content: 'L. ' + Number(this._service.descuento).toFixed(2),
                    styles: {
                      halign: 'right',
                    },
                  },
                ],

                [
                  {
                    content: 'Impuesto:',
                    styles: {
                      halign: 'right',
                    },
                  },
                  {
                    content: 'L. ' + Number(this._service.isv).toFixed(2),
                    styles: {
                      halign: 'right',
                    },
                  },
                ],

                [
                  {
                    content: 'Total:',
                    styles: {
                      halign: 'right',
                    },
                  },
                  {
                    content: 'L. ' + Number(this._service.total).toFixed(2),
                    styles: {
                      halign: 'right',
                    },
                  },
                ],
              ],
              theme: 'plain',
            });

            autoTable(doc, {
              body: [
                // [
                //   {
                //     content: 'Terminos y notas',
                //     styles: {
                //       halign: 'left',
                //       fontSize: 14,
                //     },
                //   },
                // ],
                [
                  {
                    content:
                      //'\nVendedor:' +
                      `Fecha limite de emision: ${
                        this.datoscai.FECHA_FIN || ''
                      }` +
                      `\nRango desde ${
                        this.datoscai.RANGO_DESDE || ''
                      } hasta : ${this.datoscai.RANGO_HASTA || ''} ` +
                      '\nOriginal Emisor, Copia al Cliente',
                    styles: {
                      halign: 'left',
                    },
                  },
                ],
              ],
              theme: 'plain',
            });

            autoTable(doc, {
              body: [
                [
                  {
                    content: '!GRACIAS POR SU COMPRA!',
                    styles: {
                      halign: 'center',
                    },
                  },
                ],
              ],
              theme: 'plain',
            });

            doc.save('factura');
            this._dialgo.close();
            this._route.navigate(['/ventas/ventas']);
          },
          () => {
            this._dialgo.close();
            this._route.navigate(['/ventas/ventas']);
          }
        );
      }
      this._service.mostrar();
    });
  }
}
