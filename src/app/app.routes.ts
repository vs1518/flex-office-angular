import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'reservations' },

  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.route').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'reservations',
    canActivate: [authGuard],
    loadChildren: () => import('./features/reservations/reservations.routes').then(m => m.RESERVATIONS_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },

  { path: '**', redirectTo: 'reservations' },
];
