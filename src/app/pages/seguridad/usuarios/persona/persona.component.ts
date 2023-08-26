import { Component } from '@angular/core';
import { PersonasPackageService } from 'src/app/pages/personas/personas/personas-package.service';
import { UsuariosPackageService } from '../usuarios-package.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {

  buscar:string = '';
  campo: any[] = ['PRIMER_NOMBRE','DNI','SEXO'];


  constructor(
    public _persona: PersonasPackageService,
    private _usuario:UsuariosPackageService,
    private _dialog:DialogRef<PersonaComponent>
  ){
    this._persona.mostrarusuario();    
  }


  pasarpersona(e:any){
    console.log(e);
    this._usuario.register.get('COD_PERSONA').setValue(e.COD_PERSONA);
    this._usuario.nombre = e.PRIMER_NOMBRE + ' ' + e.PRIMER_APELLIDO
    this._dialog.close()
  }

}
