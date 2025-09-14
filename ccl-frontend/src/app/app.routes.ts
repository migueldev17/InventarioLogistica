import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

// DEFINIMOS LAS RUTAS DE LA APLICACIÓN
export const routes: Routes = [
  { path: 'login', component: LoginComponent },        // RUTA DE LOGIN
  { path: 'register', component: RegisterComponent },  // RUTA DE REGISTRO
  { path: 'dashboard', component: DashboardComponent },// RUTA DE DASHBOARD
  { path: '', redirectTo: 'login', pathMatch: 'full' } // SI NO HAY RUTA, REDIRIGE A LOGIN
];
