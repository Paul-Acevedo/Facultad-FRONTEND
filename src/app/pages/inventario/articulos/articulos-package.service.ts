import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ArticulosPackageService {
  private articulos = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.articulos.asObservable();

  private articulosid = new BehaviorSubject<any[]>([]);
  public responses$: Observable<any[]> = this.articulosid.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}articulos`;
  
  public valor:number = 0;

  constructor(private _http: HttpClient, private _globals: GlobalService) {}

  register: FormGroup = new FormGroup({
    COD_ARTICULO: new FormControl(null),
    COD_CATEGORIA: new FormControl('', Validators.required),
    NOMBRE_ARTICULO: new FormControl('', Validators.required),
    PRECIO_COMPRA: new FormControl('', [Validators.required,Validators.pattern('^[0-9.]+$')]),
    PRECIO_VENTA: new FormControl('', [Validators.required,Validators.pattern('^[0-9.]+$')]),
    DESCRIPCION: new FormControl('', Validators.required),
  })

  registerr: FormGroup = new FormGroup({
    COD_ARTICULO: new FormControl(null),
    CANTIDAD: new FormControl('', Validators.required),
    DESCRIPCION: new FormControl('', Validators.required)
  });

  inicializarForm() {
    this.register.setValue({
      COD_ARTICULO: null,
      COD_CATEGORIA: null,
      NOMBRE_ARTICULO: '',
      PRECIO_COMPRA: '',
      PRECIO_VENTA: '',
      DESCRIPCION: '',
    });
  }

  popForm(data: any) {
    this.register.setValue({
      COD_ARTICULO: data.COD_ARTICULO,
      COD_CATEGORIA: data.COD_CATEGORIA,
      NOMBRE_ARTICULO: data.NOMBRE_ARTICULO,
      PRECIO_COMPRA: data.PRECIO_COMPRA,
      PRECIO_VENTA: data.PRECIO_VENTA,
      DESCRIPCION: data.DESCRIPCION,
    });
  }

  mostrarpermiso(rol: any, objeto) {
    const request$ = this._globals
      .obtener(`permisossistemaid/${rol}/${objeto}`)
      .pipe(
        tap((resp: any) => {
          this.permiso.next(resp);
        })
      );
    return request$.subscribe();
  }

  mostrar() {
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('articulos').pipe(
      tap((resp: any) => {
        this.Cargando$.next(false);
        this.articulos.next(resp);
      })
    );
    return request$.subscribe();
  }

  mostrarid(id:number) {
    this.Cargando$.next(true);
    const request$ = this._globals.obtener(`kardex/${id}`).pipe(
      tap((resp: any) => {
        this.Cargando$.next(false);
        this.articulosid.next(resp);
      })
    );
    return request$.subscribe();
  }
  
  crear(params: any): Observable<any> {
    return this._http.post(this.url, params).pipe(map((resp: any) => resp));
  }

  crearaumenta(params: any,url:any): Observable<any> {
    return this._http.post(`${environment.url}${url}`, params).pipe(map((resp: any) => resp));
  }

  

  actualizar(params: any): Observable<any> {
    return this._http.put(this.url, params).pipe(map((resp: any) => resp));
  }

  eliminar(id: any): Observable<any> {
    //   return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
    return this._http.delete(this.url + '/' + id);
  }
}
