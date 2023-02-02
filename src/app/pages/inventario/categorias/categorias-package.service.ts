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
export class CategoriasPackageService {


  private categorias = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.categorias.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}categorias`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_CATEGORIA: new FormControl(null),
    NOM_CATEGORIA: new FormControl('', Validators.required),
    DESCRIPCION: new FormControl('', Validators.required),
  });

  inicializarForm(){
    this.register.setValue({
      COD_CATEGORIA:null,
      NOM_CATEGORIA: '',
      DESCRIPCION: '',
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
    const request$ = this._globals.obtener('categorias').pipe(tap((resp:any)=>{
      console.log(resp)
    this.Cargando$.next(false);
     this.categorias.next(resp)
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
    console.log(id)
 //   return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
     return this._http.delete(this.url+'/'+id);
  }
}
