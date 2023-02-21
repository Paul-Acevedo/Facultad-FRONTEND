import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css'],
})
export class TelefonosComponent {
  telefono:any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    let id: string = this.route.snapshot.paramMap.get('id');
    this.http.get(environment.url + 'telefono/' + id).subscribe((resp:any) => {
      console.log(resp);
      this.telefono = resp;
    });
    console.log(id);
  }


}
