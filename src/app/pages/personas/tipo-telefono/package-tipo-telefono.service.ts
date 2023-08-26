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
export class PackageTipoTelefonoService {

  private tipotelefono = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.tipotelefono.asObservable();
  
  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}tipo-telefono`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_TIPO_TELEFONO: new FormControl(null),
    TIPO_TELEFONO: new FormControl('', Validators.required),
    ESTADO: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_TIPO_TELEFONO:null,
      TIPO_TELEFONO: '',
      ESTADO:''
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('tipo-telefono').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.tipotelefono.next(resp)
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
