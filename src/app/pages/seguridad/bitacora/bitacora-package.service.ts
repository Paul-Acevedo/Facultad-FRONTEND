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
export class BitacoraPackageService {

  private bitacora = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.bitacora.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}bitacora`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_ROL: new FormControl(null),
    NOMBRE_ROL: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      COD_ROL:null,
      NOMBRE_ROL: ''
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('bitacora').pipe(tap((resp:any)=>{
      console.log(resp)
    this.Cargando$.next(false);
     this.bitacora.next(resp)
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
    return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
  }
}
