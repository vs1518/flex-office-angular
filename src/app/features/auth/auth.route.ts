import { Routes } from '@angular/router';
import { LoginPage } from './components/login.page';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
