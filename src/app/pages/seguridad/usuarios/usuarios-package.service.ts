import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsuariosPackageService {
  private usuario = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.usuario.asObservable();
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}usuario`;

  persona = new FormControl('');
  rol = new FormControl('');

  constructor(private _http: HttpClient, private _globals: GlobalService) {}

  register: FormGroup = new FormGroup({
    COD_USUARIO: new FormControl(null),
    COD_PERSONA: new FormControl('', Validators.required),
    COD_ROL: new FormControl('', Validators.required),
    USUARIO: new FormControl('', Validators.required),
    EMAIL: new FormControl('', [Validators.required, Validators.email]),
    // CONTRASEÑA:new FormControl('', [Validators.required,Validators.min(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
    // repitepass:new FormControl('',[Validators.required,Validators.min(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]),
    ESTADO: new FormControl('', Validators.required),
  });

  inicializarForm() {
    this.register.get('ESTADO').disable();
    this.register.setValue({
      COD_USUARIO: null,
      COD_PERSONA: '',
      COD_ROL: '',
      USUARIO: '',
      EMAIL: '',
      ESTADO: '',
    });
  }

  popForm(data: any) {
    delete data.IMG;
    delete data.FEC_REGISTRO;
    delete data.ULT_MODIFICACION;
    delete data.PRIMER_VEZ;
    delete data.INTENTOS;
    delete data.FEC_VENCIMIENTO;
    delete data.PERSONA;
    delete data.NOMBRE_ROL;
    this.register.get('ESTADO').enable();
    this.register.setValue({
      COD_USUARIO: data.COD_USUARIO,
      COD_PERSONA: data.COD_PERSONA,
      COD_ROL: data.COD_ROL,
      USUARIO: data.USUARIO,
      EMAIL: data.EMAIL,
      ESTADO: data.ESTADO,
    });
  }

  mostrarpermiso(rol: any, objeto) {
    const request$ = this._globals
      .obtener(`permisossistemaid/${rol}/${objeto}`)
      .pipe(
        tap((resp: any) => {
          this.permiso.next(resp);
        })
      );
    return request$.subscribe();
  }

  mostrar() {
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('usuario').pipe(
      tap((resp: any) => {
        console.log(resp);
        this.Cargando$.next(false);
        this.usuario.next(resp);
      })
    );
    return request$.subscribe();
  }

  crear(params: any): Observable<any> {
    return this._http.post(this.url, params).pipe(map((resp: any) => resp));
  }

  actualizar(params: any): Observable<any> {
    return this._http.put(this.url, params).pipe(map((resp: any) => resp));
  }

  eliminar(id: any): Observable<any> {
    return this._http.delete(this.url + '/' + id);
  }
}
