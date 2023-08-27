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
export class ClientesPackageService {

 
  private clientes = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.clientes.asObservable();
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private tipoclientes = new BehaviorSubject<any[]>([]);
  public responsetipo$: Observable<any[]> = this.tipoclientes.asObservable();

  private persona = new BehaviorSubject<any[]>([]);
  public responsepersona$: Observable<any[]> = this.persona.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}clientes`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_CLIENTE: new FormControl(null),
    COD_PERSONA: new FormControl('', Validators.required),
    COD_TIPO_CLIENTE: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_CLIENTE:null,
      COD_PERSONA: '',
      COD_TIPO_CLIENTE: ''
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }


  mostrarpersona(){
    const request$ = this._globals.obtener('persona').pipe(tap((resp:any)=>{
     this.persona.next(resp);
   }));
    return request$.subscribe();
  }

   mostrar(busqueda: string = ""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('clientes?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.clientes.next(resp)
   }));
    return request$.subscribe();
  }

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }

  mostrartipoclientes(){
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
  }
  
}
