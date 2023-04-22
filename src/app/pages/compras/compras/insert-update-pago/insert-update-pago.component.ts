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
    private _sweet: SweetAlertService
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

  guardar() {
    // crea usuario
    let datos = this._service.register.value;
    let params = {
      codproveedor: this._service.pago.value.COD_PERSONA.COD_PERSONA,
      total: this._service.total,
      productos: this._service.productos,
      user: localStorage.getItem('user'),
      isv: 0
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
       


        Confirm.show(
          'Confirmar',
          'Desea imprimir factura?',
          'Si',
          'No',
          () => {
         
           let datos:any = []
            console.log(this._service.productos);

            for (var i = 0; i < this._service.productos.length; i++) {
             datos.push([this._service.productos[i].producto,this._service.productos[i].precio,this._service.productos[i].cantidad])
            }
              const doc = new jsPDF();
          
              autoTable(doc, {
                body: [
                  [
                    {
                      content: 

                      'AGROCOMERCIAL "La libertad"' +
                      '\nCESAR A. ANDINO R.T.N 03061953000851' +
                      '\nBo. La flor,La libertad,Comayagua' +
                      '\n Tel: 2724-0568 - 97809709'
                      ,
                      styles: {
                        halign: 'center',
                        fontSize: 20,
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
                        `CAI: #INV0001` +
                        `\nFACTURA SAR: 123456` +
                        `\nFECHA: ${new Date()}` ,
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
                        '\nVenta:efectivo' +
                        '\nNombre cliente' ,
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
                head: [['Producto', 'Precio', 'Cantidad']],
                  
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
                      content: 'Lps. '+ this._service.total,
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
                      content: 'Lps. '+this._service.total,
                      styles: {
                        halign: 'right',
                      },
                    },
                  ],
                  // [
                  //   {
                  //     content: 'Total amount:',
                  //     styles: {
                  //       halign: 'right',
                  //     },
                  //   },
                  //   {
                  //     content: '$4000',
                  //     styles: {
                  //       halign: 'right',
                  //     },
                  //   },
                  // ],
                ],
                theme: 'plain',
              });
          
              autoTable(doc, {
                body: [
                  [
                    {
                      content: 'Terminos y notas',
                      styles: {
                        halign: 'left',
                        fontSize: 14,
                      },
                    },
                  ],
                  [
                    {
                      content:
                        'Fecha limite de emision' +
                        'Rango desde hasta' +
                        'Original cliente',
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
            
          },
          () => {
          
          },
          );

      }
      this._service.mostrar();
     // this._service.productos = [];
      ///  this.cerrarmodal();
    });
  }
}
