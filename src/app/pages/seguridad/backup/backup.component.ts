import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import {GlobalService} from '../../../services/global.service';
import {tap} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  usuario:any;

  register:any
  private back = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.back.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  // private cargando = new BehaviorSubject<boolean>(false);
  // public responseCargando$: Observable<boolean> = this.cargando.asObservable();

  constructor(private _service:GlobalService,
    private _sweet: SweetAlertService) { }

  ngOnInit(): void {
    this.mostrar();
    this.register = new FormGroup({
      NOMBRE: new FormControl(null)
    });
  }

  mostrar(){
    this.Cargando$.next(true);
    const request$ = this._service.obtener('bacselect').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.back.next(resp)
   }));
    return request$.subscribe();
  }

  crear(){
    this._sweet.mensajeConConfirmacion('Copia de seguridad', '¿Desea crear una copia de seguridad?', 'info').
    then((result) => {
      if (result) {
        let params = {
          nombre:'hola'
        }
    
      this.Cargando$.next(true);
      this._service.crearBackup(params).subscribe(resp=>{
        this.Cargando$.next(false);
        if(resp.ok){
          this._sweet.mensajeSimple('copia de seguridad realizado correctamente', 'Copia de seguridad', 'success');
        }else{
          this._sweet.mensajeSimple('Ocurrio un error','Backup','warning');
        }
      });
      }
    })

   
}

restaurar(){
  this._sweet.mensajeConConfirmacion('Restauracion del sistema', '¿Desea restaurar el sistema?', 'info').
    then((result) => {
      if (result) {
        let params = {
          nombre: this.register.value.NOMBRE
        }
    
      // this.Cargando$.next(true);
      // this._service.crearBackup(params).subscribe(resp=>{
      //   this.Cargando$.next(false);
      //   if(resp.ok){
      //     this._sweet.mensajeSimple('copia de seguridad realizado correctamente', 'Copia de seguridad', 'success');
      //   }else{
      //     this._sweet.mensajeSimple('Ocurrio un error','Backup','warning');
      //   }
      // });
      }
    })
}

}
