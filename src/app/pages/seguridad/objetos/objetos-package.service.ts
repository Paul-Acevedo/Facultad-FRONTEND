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
export class ObjetosPackageService {

  private objetos = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.objetos.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private padresid = new BehaviorSubject<any[]>([]);
  public responseid$: Observable<any[]> = this.padresid.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}objetos`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_OBJETO: new FormControl(null),
    OBJETO: new FormControl('', Validators.required),
    ICONO: new FormControl('', Validators.required),
    URL: new FormControl('', Validators.required),
    ID_PADRE: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_OBJETO:null,
      OBJETO: '',
      ICONO: '',
      URL:'',
      ID_PADRE:''
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(busqueda: string = ""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('objetos?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.objetos.next(resp)
   }));
    return request$.subscribe();
  }

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }
  
  mostrarobjetos(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('objetospadre').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.padresid.next(resp)
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
