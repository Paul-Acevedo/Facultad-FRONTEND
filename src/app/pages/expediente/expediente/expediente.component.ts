import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';
import { CitaComponent } from '../cita/cita.component';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent {

  selectedFile: any = null;
  documentUrl: string = null;
  documentoNum: number = null;

  constructor(private http: HttpClient,
    private _dialog:MatDialog){}

  onFileSelected(event:any,documentoNum:any): void {
    this.selectedFile = event.target.files[0]
    this.documentoNum = documentoNum;
  }


  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(CitaComponent);
  }
  
  onUpload() {

    console.log(this.selectedFile);
    if (this.selectedFile == null){
       Notify.warning("Seleccione un archivo")
    }else{
      let user = localStorage.getItem("user");
      const form = new FormData();
      form.append('myFile', this.selectedFile,user+'_'+this.documentoNum+'_'+this.selectedFile.name);
      
      this.http.post('http://localhost:3000/upload',form)
        .subscribe((response:any) => {
          
          Notify.success(response.msg)

          this.selectedFile = null
        });
  }
}

  
}
