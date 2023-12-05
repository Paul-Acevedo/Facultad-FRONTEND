import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PackageTipoDireccionService {

  private tipodireccion = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.tipodireccion.asObservable();
  
  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}tipo-direccion`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_TIPO_DIRECCION: new FormControl(null),
    TIPO_DIRECCION: new FormControl('', Validators.required),
    ESTADO: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_TIPO_DIRECCION:null,
      TIPO_DIRECCION: '',
      ESTADO:''
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(busqueda: string = ""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('tipo-direccion?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.tipodireccion.next(resp)
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
