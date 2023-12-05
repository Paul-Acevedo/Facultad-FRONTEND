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
export class PermisosPackageService {

 
  private objetos = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.objetos.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}permisos`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_PERMISO: new FormControl(null),
    COD_ROL: new FormControl('', Validators.required),
    COD_OBJETO: new FormControl('', Validators.required),
    CONSULTAR: new FormControl(''),
    INSERTAR: new FormControl(''),
    ACTUALIZAR: new FormControl(''),
    ELIMINAR: new FormControl(''),
    
  });

  inicializarForm(){
    this.register.setValue({
      COD_PERMISO:null,
      COD_ROL:null,
      COD_OBJETO: '',
      CONSULTAR: '',
      INSERTAR: '',
      ACTUALIZAR: '',
      ELIMINAR: ''
     
    });
  }

  
  mostrarpermiso(rol:any,objeto:any){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }

  popForm(data:any){
    this.register.setValue({
      COD_PERMISO:data.COD_PERMISO,
      COD_ROL:data.COD_ROL,
      COD_OBJETO: data.COD_OBJETO,
      CONSULTAR: data.CONSULTAR == 'SI' ? true : false,
      INSERTAR: data.INSERTAR == 'SI' ? true : false,
      ACTUALIZAR: data.ACTUALIZAR == 'SI' ? true : false,
      ELIMINAR:data.ELIMINAR == 'SI' ? true : false
     
    });
  }

   mostrar(busqueda: string = ""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('permisos?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.objetos.next(resp)
   }));
    return request$.subscribe();
  }

  crear(params:any):Observable<any>{
    return this._http.post(this.url,params).pipe(map((resp:any)=>resp));
  }

  actualizar(params:any):Observable<any>{
    return this._http.put(this.url,params).pipe(map((resp:any)=>resp));
  }

  // eliminar(idrol:any,idobjeto:any):Observable<any>{
  // let param = {
  //   idrol:idrol,
  //   idobjeto:idobjeto
  // }
  //   return this._http.request('Delete',this.url,{ body:param }).pipe(map((resp:any)=>resp));
  // }
  eliminar(idrol:any,idobjeto:any):Observable<any>{
    let param = {
      idrol:idrol,
      idobjeto:idobjeto
    }
     return this._http.delete(this.url);
  }
}
