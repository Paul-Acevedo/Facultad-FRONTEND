 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VentasPackageService {

  private ventas = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.ventas.asObservable();

  private ventasdetalles = new BehaviorSubject<any[]>([]);
  public responsedetalles$: Observable<any[]> = this.ventasdetalles.asObservable();

  private ventasdetallesfactura = new BehaviorSubject<any[]>([]);
  public responsedetallesfactura$: Observable<any[]> = this.ventasdetallesfactura.asObservable();

    private clientess = new BehaviorSubject<any[]>([]);
  public responses$: Observable<any[]> = this.clientess.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();
  
  private articulos = new BehaviorSubject<any[]>([]);
  public responsearticulos$: Observable<any[]> = this.articulos.asObservable();

  private factura = new BehaviorSubject<any[]>([]);
  public responsefactura$: Observable<any[]> = this.factura.asObservable();

  private articulosid = new BehaviorSubject<any[]>([]);
  public responsearticulosid$: Observable<any[]> = this.articulosid.asObservable();

  private clientes = new BehaviorSubject<any[]>([]);
  public responseclientes$: Observable<any[]> = this.clientes.asObservable();

  private cai = new BehaviorSubject<any[]>([]);
  public responsecai$: Observable<any[]> = this.cai.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}ventas`;

  productos:any[] = [];
  total:any = 0;
  isv:any = 0;
  subtotal:any = 0;
  descuento:any = 0;
  nombreproducto:string;
  isvPorcentaje:any = 0;
  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_VENTA: new FormControl(null),
    COD_ARTICULO: new FormControl('',Validators.required),
    PRECIO_VENTA: new FormControl('',Validators.required),
    CANTIDAD: new FormControl('',Validators.required),
    TOTALBRUTO: new FormControl('',Validators.required),
    TOTALFINAL: new FormControl('',Validators.required),
    STOCK: new FormControl('',Validators.required),
    ISV: new FormControl('',Validators.required),
  });

  pago: FormGroup = new FormGroup({
    COD_PERSONA: new FormControl('', Validators.required),
    RTN: new FormControl(''),
    DESCUENTO: new FormControl('',Validators.pattern('^[0-9.]+$'))
  });

  inicializarForm(){
    this.register.setValue({
      COD_VENTA: null,
      COD_ARTICULO: '',
      PRECIO_VENTA: '',
      CANTIDAD: '',
      TOTALBRUTO: '',
      TOTALFINAL: '',
      STOCK: '',
      ISV:''
    });
  }

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(busqueda: string = ""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('ventas?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.ventas.next(resp)
   }));
    return request$.subscribe();
  }

  mostrarCaiEstado(){
    const request$ = this._globals.obtener('caiestado').pipe(tap((resp:any)=>{
     this.cai.next(resp)
   }));
    return request$.subscribe();
  }

  mostrardetalles(id:any, busqueda: string = ""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('ventasdetalles/'+id+"?busqueda="+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.ventasdetalles.next(resp)
   }));
    return request$.subscribe();
  }


  generarFactura(id:any){
    const request$ = this._globals.obtener('ventasdetallesfactura/'+id).pipe(tap((resp:any)=>{
     this.ventasdetallesfactura.next(resp)
     console.log(resp);
   }));
    return request$.subscribe();
  }
  


  mostrararticulos(){
    const request$ = this._globals.obtener('articulos').pipe(tap((resp:any)=>{
     this.articulos.next(resp)
   }));
    return request$.subscribe();
  }

  mostrarClientes(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('clientes').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.clientess.next(resp)
   }));
    return request$.subscribe();
  }

  mostrararticulosid(id:any){
    const request$ = this._globals.obtener('articulosid/'+id).pipe(tap((resp:any)=>{
     this.articulosid.next(resp)
   }));
    return request$.subscribe();
  }


  mostrarfactura(id:any){
    const request$ = this._globals.obtener('factura/'+id).pipe(tap((resp:any)=>{
     this.factura.next(resp)
   }));
    return request$.subscribe();
  }



  crear(params:any):Observable<any>{
    return this._http.post(this.url,params).pipe(map((resp:any)=>resp));
  }

  actualizar(params:any):Observable<any>{
    return this._http.put(this.url,params).pipe(map((resp:any)=>resp));
  }

  eliminar(id:any):Observable<any>{
    //return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
    return this._http.delete(this.url+'/'+id);
  }

}
