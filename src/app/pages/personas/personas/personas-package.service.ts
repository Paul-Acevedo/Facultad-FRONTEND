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
export class PersonasPackageService {


  private persona = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.persona.asObservable();

  private personausuario = new BehaviorSubject<any[]>([]);
  public responseusuario$: Observable<any[]> = this.personausuario.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}persona`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }


  register: FormGroup = new FormGroup({
    COD_PERSONA: new FormControl(null),
    PRIMER_NOMBRE: new FormControl('', Validators.required),
    SEGUNDO_NOMBRE: new FormControl(''),
    PRIMER_APELLIDO: new FormControl('', Validators.required),
    SEGUNDO_APELLIDO: new FormControl(''),
    DNI: new FormControl('', Validators.required),
    FEC_NACIMIENTO: new FormControl('', Validators.required),
    SEXO: new FormControl('', Validators.required)
  });

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }
  
  inicializarForm(){
    this.register.setValue({
      COD_PERSONA:null,
      PRIMER_NOMBRE:'',
      SEGUNDO_NOMBRE:'',
      PRIMER_APELLIDO:'',
      SEGUNDO_APELLIDO:'',
      DNI:'',
      FEC_NACIMIENTO:'',
      SEXO:''
    });
  }

  popForm(data:any){
    this.register.patchValue({
      COD_PERSONA:data.COD_PERSONA,
      PRIMER_NOMBRE:data.PRIMER_NOMBRE,
      SEGUNDO_NOMBRE:data.SEGUNDO_NOMBRE,
      PRIMER_APELLIDO:data.PRIMER_APELLIDO,
      SEGUNDO_APELLIDO:data.SEGUNDO_APELLIDO,
      DNI:data.DNI,
      FEC_NACIMIENTO:data.FEC_NACIMIENTO,
      SEXO:data.SEXO
    });
  }

   mostrar(busqueda: string = ""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('persona?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.persona.next(resp);
   }));
    return request$.subscribe();
  }

  mostrarusuario(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('personausuario').pipe(tap((resp:any)=>{
     this.Cargando$.next(false);
     this.personausuario.next(resp);
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
   // return this._http.request('Delete',this.url,{ body:id }).pipe(map((resp:any)=>resp));
  }
}
