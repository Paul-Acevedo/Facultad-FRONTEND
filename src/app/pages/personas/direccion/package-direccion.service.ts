import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PackageDireccionService {

  private direccion = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.direccion.asObservable();
  private persona = new BehaviorSubject<any[]>([]);
  public responsepersona$: Observable<any[]> = this.persona.asObservable();
  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}direccion`;
  public id: string;

  constructor(private _http: HttpClient, private _globals: GlobalService) {}

  register: FormGroup = new FormGroup({
    COD_DIRECCION: new FormControl(null),
    COD_PERSONA: new FormControl(null),
    COD_TIPO_DIRECCION: new FormControl('', Validators.required),
    CALLE: new FormControl(''),
    BLOQUE: new FormControl(''),
    AVENIDA: new FormControl(''),
    DIRECCION: new FormControl('', Validators.required),
    CIUDAD: new FormControl('', Validators.required)
  });

 

  inicializarForm() {
    this.register.setValue({
      COD_DIRECCION: null,
      COD_PERSONA: null,
      COD_TIPO_DIRECCION: '',
      CALLE: '',
      BLOQUE: '',
      AVENIDA: '',
      DIRECCION: '',
      CIUDAD: ''

    });
  }

  popForm(data: any) {
    this.register.setValue(data);
  }

  mostrar() {
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('direccion/'+ this.id).pipe(
      tap((resp: any) => {
        console.log(resp);
        this.Cargando$.next(false);
        this.direccion.next(resp);
      })
    );
    return request$.subscribe();
  }

  mostrarpersona() {
    const request$ = this._globals.obtener('personaid/'+ this.id).pipe(
      tap((resp: any) => {
        console.log(resp);
        this.persona.next(resp);
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
