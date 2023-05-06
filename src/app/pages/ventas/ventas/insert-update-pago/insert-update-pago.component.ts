import { Component } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { DialogRef } from '@angular/cdk/dialog';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
  constructor(
    public _dialgo: DialogRef<InsertUpdatePagVentasComponent>,
    public _service: VentasPackageService,
    public _cliente: ClientesPackageService,
    private _sweet: SweetAlertService,
    private _route: Router
  ) {
    this._service.mostrarClientes();
    this._service.responses$.subscribe((r) => {
      this.options = r;
    });

    this.filteredClientes = this._service.pago
      .get('COD_PERSONA')
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name
            ? this._filterClientes(name as string)
            : this.options.slice();
        })
      );
  }

  cerrarmodal(){
    this._dialgo.close();
  }

  displayClientes(user: any): string {
    return user && user.PRIMER_NOMBRE ? user.PRIMER_NOMBRE : '';
  }

  private _filterClientes(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.PRIMER_NOMBRE.toLowerCase().includes(filterValue)
    );
  }

  guardar() {
    // crea usuario
    let datos = this._service.register.value;

    let desc = this._service.pago.value.DESCUENTO;
    desc = (this._service.total * desc)

    console.log(desc);
    let params = {
      codcliente: this._service.pago.value.COD_PERSONA.COD_PERSONA,
      subtotal: this._service.subtotal,
      total: (this._service.total-desc),
      productos: this._service.productos,
      user: localStorage.getItem('user'),
      isv: this._service.isv,
      desc:desc
    };

    this._service.crear(params).subscribe((resp) => {
      if (!resp.ok) {
        this._sweet.mensajeSimple('Ocurrio un error', 'VENTAS', 'warning');
        this._service.productos = [];
      } else {
        this._sweet.mensajeSimple('Creado correctamente', 'VENTAS', 'success');

        Confirm.show(
          'Confirmar',
          '¿Desea imprimir factura?',
          'Si',
          'No',
          () => {
            let datos: any = [];
            console.log(this._service.productos);

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
                      '\nCesar A. Andino     R.T.N 03061953000851' +
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
                      `CAI: BD23CEDBBD518F34878D9A7495F9BD9 ` +
                      `\nFACTURA SAR: 00-001-01-00043356 ` +
                      `\nFECHA: `,
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
                      '\nNombre Cliente',
                    // '\nBilling Address line 2' +
                    // '\nZip code - City' +
                    // '\nCountry',
                    styles: {
                      halign: 'left',
                    },
                  },
                  // {
                  //   content:
                  //     'Shipping address:' +
                  //     '\nJohn Doe' +
                  //     '\nShipping Address line 1' +
                  //     '\nShipping Address line 2' +
                  //     '\nZip code - City' +
                  //     '\nCountry',
                  //   styles: {
                  //     halign: 'left',
                  //   },
                  // },
                  // {
                  //   content:
                  //     'From:' +
                  //     '\nCompany name' +
                  //     '\nShipping Address line 1' +
                  //     '\nShipping Address line 2' +
                  //     '\nZip code - City' +
                  //     '\nCountry',
                  //   styles: {
                  //     halign: 'right',
                  //   },
                  // },
                ],
              ],
              theme: 'plain',
            });

            // autoTable(doc, {
            //   body: [
            //     [
            //       {
            //         content: 'Amount due:',
            //         styles: {
            //           halign: 'right',
            //           fontSize: 14,
            //         },
            //       },
            //     ],
            //     [
            //       {
            //         content: '$4000',
            //         styles: {
            //           halign: 'right',
            //           fontSize: 20,
            //           textColor: '#3366ff',
            //         },
            //       },
            //     ],
            //     [
            //       {
            //         content: 'Due date: 2022-02-01',
            //         styles: {
            //           halign: 'right',
            //         },
            //       },
            //     ],
            //   ],
            //   theme: 'plain',
            // });

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

              // [
              //   ['Producto', 'Category', '2', '$450', '$1000'],
              //   ['Producto', 'Category', '2', '$450', '$1000'],
              //   ['Producto', 'Category', '2', '$450', '$1000'],
              //   ['Product0', 'Category', '2', '$450', '$1000'],
              // ],
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
                    content: 'Lps. ' + this._service.subtotal,
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
                    content: 'Lps. ' + this._service.isv,
                    styles: {
                      halign: 'right',
                    },
                  },
                ],

                [
                  {
                    content: 'Descuento:' ,
                    styles: {
                      halign: 'right',
                    },
                  },
                  {
                    content: 'Lps. ' ,
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
                    content: 'Lps. ' + this._service.total,
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
                      'Fecha limite de emision: 2023-11-22' +
                      '\nRango desde 000-001-01-000-42801 hasta : 000-001-01-000-44800 ' +
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
