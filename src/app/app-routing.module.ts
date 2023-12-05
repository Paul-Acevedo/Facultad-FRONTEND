import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponentComponent } from './full-component/full-component.component';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
 import { PreguntasSeguridadComponent } from './auth/preguntas-seguridad/preguntas-seguridad.component';
 import { CambioPassComponent } from './auth/cambio-pass/cambio-pass.component';
 import { RecuComponent } from './auth/recu/recu.component';
 import { RecuPreguntasComponent } from './auth/recu-preguntas/recu-preguntas.component';
 import { RecuCorreoComponent } from './auth/recu-correo/recu-correo.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: LoginComponent },
    { path: 'preguntas', component: PreguntasSeguridadComponent },
   { path: 'contraseña', component: CambioPassComponent },
   { path: 'seleccion', component: RecuComponent },
   { path: 'recuperacion-preguntas', component: RecuPreguntasComponent },
   { path: 'recuperacion-correo', component: RecuCorreoComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: '',
    component: FullComponentComponent,canActivate:[AuthGuard],
    children: [
      {
        path:'dashboard',component:DashboardComponent
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./pages/seguridad/seguridad.module').then(m => m.SeguridadModule)
      },
      {
        path: 'personas',
        loadChildren: () => import('./pages/personas/personas.module').then(m => m.PersonasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
