import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../services/auth.store';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <h1 class="text-2xl font-bold mb-3">Connexion (temporaire)</h1>
    <div class="flex gap-3">
    <button class="px-3 py-2 bg-blue-600 text-white rounded" (click)="login('user')">USER</button>
    <button class="px-3 py-2 bg-emerald-600 text-white rounded" (click)="login('admin')">ADMIN</button>
    </div>
`,
})
export class LoginPage {
  private auth = inject(AuthStore);
  private router = inject(Router);

  login(role: 'user' | 'admin') {
    this.auth.quickLogin(role);
    this.router.navigateByUrl('/reservations');
  }
}
