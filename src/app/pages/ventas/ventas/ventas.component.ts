import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { VentasInsertUpdateComponent } from './ventas-insert-update/ventas-insert-update.component';
import { VentasPackageService } from './ventas-package.service';
import * as printJS from 'print-js';
import * as XLSX from 'xlsx';
import { Confirm } from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
})
export class VentasComponent implements OnInit {
  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro
  buscar: any = '';
  campo: any[] = ['PRIMER_NOMBRE', 'DNI'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any; //paso //2
  i: number = 0;
  permisos: any = [];

  constructor(
    public _service: VentasPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {
    this._service.mostraruser();
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'), 18);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  busqueda(){
    this._service.mostrar(this.buscar);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  excel() {
    let data: any[] = [];
    this._service.mostrar(this.buscar);
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    XLSX.writeFileXLSX(workbook, 'ventas.xlsx', {});
  }

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(VentasInsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(VentasInsertUpdateComponent);
    this._service.popForm(item);
  }

  eliminar(id: number) {
    this._sweet
      .mensajeConConfirmacion(
        'Eliminar',
        '¿Desea eliminar la venta?',
        'warning'
      )
      .then((result) => {
        if (result) {
          this._service.eliminar(id).subscribe((resp) => {
            this._service.mostrar(this.buscar);
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'VENTAS', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'VENTAS',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'VENTAS',
                'success'
              );
            }
          });
        }
      });
  }

  descargar(i: any) {
    let productos: any = [];
    let producto: any = [];

    this._service.generarFactura(i.COD_VENTA);

    this._service.responsedetallesfactura$.subscribe((r: any) => {
      productos = [];
      for (var i = 0; i < r.length; i++) {
        productos.push([
          r[i].NOMBRE_ARTICULO,
          r[i].CANTIDAD,
          'L. ' + this._service.convertidor(r[i].PRECIO),
          'L. ' + this._service.convertidor(r[i].SUB_TOTAL),
        ]);
      }
      producto = r[0];
  
    });

    Confirm.show(
      'Confirmar',
      '¿Desea imprimir factura?',
      'Si',
      'No',
      () => {
        const doc = new jsPDF();
        autoTable(doc, {
          body: [
            [
              {
                content:
                  'Agrocomercial " Libertad "' +
                  '\nCesar A. Andino   R.T.N 03061953000851' +
                  '\nBo. La Flor,La Libertad,Comayagua' +
                  '\nCorreo Electrónico: agrocomerciallibertad@gmail.com' +
                  '\n Tel: 2724-0568 - 97809709',
                styles: {
                  halign: 'center',
                  fontSize: 14,
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
                  `CAI: ${producto.CAI}` +
                  `\nFACTURA SAR: ${producto.FACTURA_SAR}` +
                  `\nFECHA: ${producto.FECHA_EMISION}`,
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
                  `Codigo factura: ${producto.COD_FACTURA}` +
                  '\nVenta: Efectivo' +
                  `\nNombre cliente: ${i.PRIMER_NOMBRE}`,
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
          head: [['Producto', 'Cantidad', 'Precio', 'Sub Total']],
          body: productos,
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
                content: 'L. ' + this._service.convertidor(producto.SUB_TOTAL),
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
                content: 'L. ' + this._service.convertidor(producto.DESCUENTO),
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
                content: 'L. ' + this._service.convertidor(producto.IMPUESTO),
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
                content: 'L. ' + this._service.convertidor(producto.TOT_PAGAR),
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
                  `\nVendedor: ${this._service.nombrevendedor}` +
                  `\nFecha limite de emision ${producto.FECHA_INICIO || ''}` +
                  `\nRango desde ${producto.RANGO_DESDE || ''} hasta ${
                    producto.RANGO_HASTA || ''
                  }` +
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
      },
      () => {}
    );
  }

  impo() {
    let url = '../../../assets/logo.jpg';
    let date = new Date();
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5>Agrocomercial "La libertad"</h5>
  <h5>Listado de Ventas</h5>
  <h6>${date.toLocaleString()}</h6>
  </div>
  </div><br>`;

    printJS({
      printable: 'reporte2',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style:
        '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Ventas',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
  }
}
