import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private movimiento = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.movimiento.asObservable();

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  
  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }
  
   mostrar(){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('kardex').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.movimiento.next(resp)
   }));
    return request$.subscribe();
  }

}
