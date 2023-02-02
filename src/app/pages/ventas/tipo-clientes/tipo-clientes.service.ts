import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TipoClientesService {

  private tipoclientes = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.tipoclientes.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}tipoclientes`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_TIPO_CLIENTE: new FormControl(null),
    TIPO_CLIENTE: new FormControl('', Validators.required),
    REBAJA: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_TIPO_CLIENTE:null,
      TIPO_CLIENTE: '',
      REBAJA: ''
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
    const request$ = this._globals.obtener('tipoclientes').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.tipoclientes.next(resp)
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
    //return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
  }

}
