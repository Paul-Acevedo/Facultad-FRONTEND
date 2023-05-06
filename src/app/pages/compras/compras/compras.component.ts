import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ComprasInsertUpdateComponent } from './compras-insert-update/compras-insert-update.component';
import { ComprasPackageService } from './compras-package.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InsertUpdatePagoComponent } from './insert-update-pago/insert-update-pago.component';
import * as printJS from 'print-js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})

export class ComprasComponent implements OnInit {
  //paginacion
  pageSize: number = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  stateCtrl: FormControl = new FormControl();
  filteredStates: Observable<any[]>;
  states: String[];

  //filtro
  permisos: any = [];
  buscar: any = '';
  campo: any[] = ['NOMBRE_PROVEEDOR', 'DNI'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any; //paso //2
  i: number = 0;

  constructor(
    public _service: ComprasPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'), 19);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  pagar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this._dialog.open(InsertUpdatePagoComponent);
    console.log('object');
   // this._service.inicializarForm();
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
    this._dialog.open(ComprasInsertUpdateComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(ComprasInsertUpdateComponent);
    this._service.popForm(item);
  }

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

  generar(i:any){


    console.log(i);
    const doc = new jsPDF();

    autoTable(doc, {
      body: [
        [
          {
            content: 'Ns Facturacion',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
          {
            content: 'Factura',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff',
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              `CAI: #INV0001` +
              `\nFecha: ${new Date()}` +
              `\nNumero factura: 123456`,
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
              'Billed to:' +
              '\nJohn Doe' +
              '\nBilling Address line 1' +
              '\nBilling Address line 2' +
              '\nZip code - City' +
              '\nCountry',
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
      head: [['Producto', 'Categoria', 'Cantidad', 'Precio', 'Amount']],
      body: [
        ['Producto', 'Category', '2', '$450', '$1000'],
        ['Producto', 'Category', '2', '$450', '$1000'],
        ['Producto', 'Category', '2', '$450', '$1000'],
        ['Product0', 'Category', '2', '$450', '$1000'],
      ],
      theme: 'striped',
      headStyles: {
        fillColor: '#343a40',
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: '$3600',
            styles: {
              halign: 'right',
            },
          },
        ],
        [
          {
            content: 'Total tax:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: '$400',
            styles: {
              halign: 'right',
            },
          },
        ],
        [
          {
            content: 'Total amount:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: '$4000',
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
              'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia' +
              'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum' +
              'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
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
            content: 'This is a centered footer',
            styles: {
              halign: 'center',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    return doc.save('invoice');
  }

  eliminar(id: number) {
    this._sweet
      .mensajeConConfirmacion(
        'Eliminar',
        '¿Desea eliminar la compra?',
        'warning'
      )
      .then((result) => {
        console.log(result);
        if (result) {
          this._service.eliminar(id).subscribe((resp) => {
            this._service.mostrar();
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'COMPRAS', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'COMPRA',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'COMPRAS',
                'success'
              );
            }
          });
        }
      });
  }

  impo() {
    let date = new Date();
    let url = '../../../assets/logo.jpg';
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5>Agrocomercial "La libertad"</h5>
  <h5>Listado de Compras</h5>
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
      documentTitle: 'Compras',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: 3,
      tabla: 'COMPRAS',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
