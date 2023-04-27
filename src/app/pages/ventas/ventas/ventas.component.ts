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
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'), 18);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  excel() {
    let worksheetData: any[] = [];
    let data: any[] = [];
    this._service.mostrar();
    console.log(
      this._service.response$.subscribe((r) => {
        data = r;
      })
    );
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    XLSX.writeFileXLSX(workbook, 's.xlsx', {});
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
            this._service.mostrar();
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

  descargar(i: number) {
    let productos: any = [];
    let producto: any = [];

    this._service.mostrarfactura(1);

    this._service.generarFactura(i);
    this._service.responsedetallesfactura$.subscribe((r: any) => {
      console.log(r);
      for (var i = 0; i < r.length; i++) {
        productos.push([r[i].NOMBRE_ARTICULO, r[i].PRECIO, r[i].CANTIDAD]);
      }
      producto = r[0];
    });
    Confirm.show(
      'Confirmar',
      'Desea imprimir factura?',
      'Si',
      'No',
      () => {
        console.log(this._service.productos);

        const doc = new jsPDF();

        autoTable(doc, {
          body: [
            [
              {
                content:
                  'AGROCOMERCIAL "La libertad"' +
                  '\nCESAR A. ANDINO R.T.N 03061953000851' +
                  '\nBo. La flor,La libertad,Comayagua' +
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
                  `CAI: #INV0001` +
                  `\nFACTURA SAR: 123456` +
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
                  'Codigo factura' + '\nVenta:efectivo' + '\nNombre cliente',
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

          body: productos,

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
                content: 'Lps. ' + producto.SUB_TOTAL,
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
                content: 'Lps. ' + producto.IMPUESTO,
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
                content: 'Lps. ' + producto.DESCUENTO,
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
                content: 'Lps. ' + producto.TOTAL,
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
                  'Fecha limite de emision' +
                  '\nRango desde hasta' +
                  '\nOriginal cliente',
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
  <h5>AGROCOMERCIAL</h5>
  <h5>Listado de Ventas</h5>
  <h6>${date.toLocaleString()}</h6>
  </div>
  </div><br>`;

    printJS({
      printable: 'reporte',
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
    // let params = {
    //   codusuario: this.usuario,
    //   codobjeto: 25,
    //   accion: 'DESCARGO',
    //   descripcion: 'DESCARGO EL PDF DE SEXO',
    // };
    // this._bitacora.crearBitacoradb(params).subscribe((resp) => resp);
  }
}
