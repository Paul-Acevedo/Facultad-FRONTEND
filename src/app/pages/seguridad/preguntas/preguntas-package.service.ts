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
export class PreguntasPackageService {

  private preguntas = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.preguntas.asObservable();
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private preguntasParam = new BehaviorSubject<any[]>([]);
  public responseParam$: Observable<any[]> = this.preguntasParam.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}preguntas`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_PREGUNTA: new FormControl(null),
    PREGUNTA: new FormControl('', Validators.required),
    ESTADO: new FormControl('', Validators.required),
    // PREGUNTA: new FormControl('', Validators.required),
    // PREGUNTA: new FormControl('', Validators.required),



  });

  inicializarForm(){
    this.register.setValue({
      COD_PREGUNTA:null,
      PREGUNTA: '',
      // CREADO_POR: '',
      // MODIFICADO_POR: '',
      // FEC_REGISTRO:'',
      // ULT_MODIFICACION:'',
      ESTADO:''
    });

    console.log(this.register.value)
  }

  popForm(data:any){
    this.register.setValue({
      COD_PREGUNTA:data.COD_PREGUNTA,
      PREGUNTA: data.PREGUNTA,
      ESTADO: data.ESTADO
    });
  }

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }
  
   mostrar(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('preguntas').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.preguntas.next(resp)
   }));
    return request$.subscribe();
  }

  mostrarParam(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('preguntasParam').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.preguntasParam.next(resp)
   }));
    return request$.subscribe();
  }

  crear(params:any):Observable<any>{
    return this._http.post(this.url,params).pipe(map((resp:any)=>resp));
  }

  crearUser(params:any):Observable<any>{
    return this._http.post(`${environment.url}preguntasUser`,params).pipe(map((resp:any)=>resp));
  }

  recuPreguntas(params:any):Observable<any>{
    return this._http.post(`${environment.url}recupreguntas`,params).pipe(map((resp:any)=>resp));
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
