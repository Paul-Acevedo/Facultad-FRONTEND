import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParametrosInsertUpdateService {


  private parametros = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.parametros.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}parametros`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_PARAMETRO: new FormControl(null),
    PARAMETRO: new FormControl('', Validators.required),
    VALOR: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_PARAMETRO: null,
      PARAMETRO:'',
      VALOR:'',
      FEC_CREACION:'',
      FEC_MODIFICACION:'',
      COD_USUARIO:''
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
    const request$ = this._globals.obtener('parametros').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.parametros.next(resp)
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
 //   return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
     return this._http.delete(this.url+'/'+id);
  }
}
