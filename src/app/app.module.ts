import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FullComponentComponent } from './full-component/full-component.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecuComponent } from './auth/recu/recu.component';
import { CambioPassComponent } from './auth/cambio-pass/cambio-pass.component';
import { RecuPreguntasComponent } from './auth/recu-preguntas/recu-preguntas.component';
import { PreguntasSeguridadComponent } from './auth/preguntas-seguridad/preguntas-seguridad.component';
import { RecuCorreoComponent } from './auth/recu-correo/recu-correo.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponentComponent,
    LoginComponent,
    RegisterComponent,
    RecuComponent,
    PreguntasSeguridadComponent,
    RecuPreguntasComponent,
    RecuCorreoComponent,
    CambioPassComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
