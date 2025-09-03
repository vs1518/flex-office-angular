import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/services/auth.store';

@Component({
  standalone: true,
  selector: 'app-admin-page',
  template: `
    <h1 class="text-2xl font-bold mb-3">Espace Admin</h1>
    <p class="text-gray-600 mb-4">
      Seuls les comptes <strong>admin</strong> ont accès à cette page.
    </p>

    <div class="p-4 rounded border bg-white mb-4">
      <p>Utilisateur connecté : <strong>{{ auth.user()?.email || '—' }}</strong></p>
      <p>Rôle : <strong>{{ auth.user()?.role || '—' }}</strong></p>
    </div>

    <button class="px-3 py-2 bg-slate-800 text-white rounded" (click)="auth.logout()">
      Se déconnecter
    </button>
  `,
})
export class AdminPage {
  auth = inject(AuthStore);
}
