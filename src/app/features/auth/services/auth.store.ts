import { Injectable, computed, signal } from '@angular/core';

export type Role = 'user' | 'admin';
export interface User { id: number; email: string; role: Role; }

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();

  isLoggedIn = computed(() => !!this._user());
  isAdmin = computed(() => this._user()?.role === 'admin');

  constructor() {
    const raw = localStorage.getItem('fo_user');
    if (raw) this._user.set(JSON.parse(raw));
  }

  quickLogin(role: Role) {
    const u: User = {
      id: role === 'admin' ? 1 : 2,
      email: role === 'admin' ? 'admin@flexoffice.com' : 'user@flexoffice.com',
      role
    };
    this._user.set(u);
    localStorage.setItem('fo_user', JSON.stringify(u));
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('fo_user');
  }
}
