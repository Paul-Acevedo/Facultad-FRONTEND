import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent {

  selectedFile: File = null;
  documentUrl: string = null;
  constructor(private http: HttpClient){}

  onFileSelected(event:any): void {
     console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0]

    
  }

  
  onUpload(): void {
    // const formData = new FormData();
    // formData.append('file', this.selectedFile, this.selectedFile.name);
  
    // console.log(formData);

    const form = new FormData();
    form.append('myFile', this.selectedFile,this.selectedFile.name);
    
    console.log(form);
    this.http.post('http://localhost:3000/upload',form)
      .subscribe(response => {
        console.log(response);
      });
  }

  
}
