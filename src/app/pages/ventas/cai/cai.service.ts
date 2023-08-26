import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CaiService {

  private cai = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.cai.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}cai`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_CAI: new FormControl(null),
    CAI: new FormControl('', Validators.required),
    FECHA_INICIO: new FormControl('', Validators.required),
    FECHA_FIN: new FormControl('', Validators.required),
    RANGO_DESDE: new FormControl('', Validators.required),
    RANGO_HASTA: new FormControl('', Validators.required),
    FACTURA_SAR: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_CAI: null,
      CAI:'',
      FECHA_INICIO:'',
      FECHA_FIN:'',
      RANGO_DESDE:'',
      RANGO_HASTA:'',
      FACTURA_SAR:''
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }
  
   mostrar(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('cai').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.cai.next(resp)
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
     return this._http.delete(this.url+'/'+id);
  }

}
