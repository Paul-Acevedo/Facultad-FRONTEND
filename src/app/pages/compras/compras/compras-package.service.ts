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
export class ComprasPackageService {
  private compras = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.compras.asObservable();

  private articulos = new BehaviorSubject<any[]>([]);
  public responsearticulos$: Observable<any[]> = this.articulos.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private comprasd = new BehaviorSubject<any[]>([]);
  public responsecompras$: Observable<any[]> = this.comprasd.asObservable();


  private articulosid = new BehaviorSubject<any[]>([]);
  public responsearticulosid$: Observable<any[]> = this.articulosid.asObservable();

  private proveedores = new BehaviorSubject<any[]>([]);
  public responseproveedores$: Observable<any[]> = this.proveedores.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}compras`;
  productos:any[] = [];
  total:any = 0;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }
  
  register: FormGroup = new FormGroup({
    COD_COMPRA: new FormControl(null),
    COD_ARTICULO: new FormControl('',Validators.required),
    PRECIO_COMPRA: new FormControl('',Validators.required),
    CANTIDAD: new FormControl('',Validators.required),
    SUB_TOTAL: new FormControl('',Validators.required),
  });
  

  pago: FormGroup = new FormGroup({
    COD_PERSONA: new FormControl('', Validators.required),
   // ISV: new FormControl('', Validators.required),
  });

  mostrardetalles(id:any){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('comprasdetalles/'+id).pipe(tap((resp:any)=>{
      console.log(resp)
    this.Cargando$.next(false);
     this.comprasd.next(resp)
   }));
    return request$.subscribe();
  }
  inicializarForm(){
    this.register.setValue({
      COD_COMPRA: new FormControl(null),
      COD_PROVEEDOR: '',
      COD_ARTICULO: '',
      COS_UNITARIO: '',
      CANTIDAD: '',
      TOTALBRUTO: '',
      TOTALFINAL: ''
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

   mostrar(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('compras').pipe(tap((resp:any)=>{
      console.log(resp)
    this.Cargando$.next(false);
     this.compras.next(resp)
   }));
    return request$.subscribe();
  }

  mostrararticulos(){
    const request$ = this._globals.obtener('articulos').pipe(tap((resp:any)=>{
     this.articulos.next(resp)
   }));
    return request$.subscribe();
  }

  mostrararticulosid(id:any){
    const request$ = this._globals.obtener('articulosid/'+id).pipe(tap((resp:any)=>{
     this.articulosid.next(resp)
   }));
    return request$.subscribe();
  }


  mostrararproveedores(){
    const request$ = this._globals.obtener('proveedores').pipe(tap((resp:any)=>{
     this.proveedores.next(resp)
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
    //console.log(id)
  //  return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
    return this._http.delete(this.url+'/'+id);
  }
}
