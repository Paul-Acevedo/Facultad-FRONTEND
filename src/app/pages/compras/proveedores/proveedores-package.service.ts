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
export class ProveedoresPackageService {

 
  private proveedores = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.proveedores.asObservable();
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  
  private persona = new BehaviorSubject<any[]>([]);
  public responsepersona$: Observable<any[]> = this.persona.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}proveedores`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_PROVEEDOR: new FormControl(null),
    COD_PERSONA: new FormControl('', Validators.required),
    NOMBRE_PROVEEDOR: new FormControl('', Validators.required),
    NOMBRE_CONTACTO: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_PROVEEDOR: null,
      COD_PERSONA: '',
      NOMBRE_PROVEEDOR: '',
      NOMBRE_CONTACTO: ''
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('proveedores').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
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

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }

  mostrarpersona(){
    
    const request$ = this._globals.obtener('persona').pipe(tap((resp:any)=>{
     this.persona.next(resp);
   }));
    return request$.subscribe();
  }

  eliminar(id:any):Observable<any>{
 //   return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
     return this._http.delete(this.url+'/'+id);
  }
}
