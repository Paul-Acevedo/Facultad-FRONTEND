import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.css']
})
export class NombreComponent {


  form:FormGroup;
  constructor( public dialogref: MatDialogRef<NombreComponent>,){

    this.form = new FormGroup({
      nombre:new FormControl('')
    })
    
  }


  guardar(){
    this.dialogref.close(this.form.value.nombre)
  }

}
