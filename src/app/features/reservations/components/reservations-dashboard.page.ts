import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIButton } from '../../../shared/components/ui/button.component';
import { UIBadge } from '../../../shared/components/ui/badge.component';
import { UIAvatar } from '../../../shared/components/ui/avatar.component';
import { UIBreadcrumb } from '../../../shared/components/ui/breadcrumb/breadcrumb.component';
import { AspectRatioDirective } from '../../../shared/components/ui/aspect-ratio.directive';
import { DebounceClickDirective } from '../../../shared/components/ui/debounce-click.directive';

type Availability = 'available' | 'occupied' | 'unknown';

@Component({
  standalone: true,
  selector: 'app-reservations-dashboard',
  imports: [CommonModule, UIButton, UIBadge, UIAvatar, UIBreadcrumb, AspectRatioDirective, DebounceClickDirective],
  template: `
  <div class="min-h-screen bg-[color:var(--background)]">
    <!-- Header local de la page -->
    <header class="border-b bg-[color:var(--card)] border-[color:var(--border)]">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-[color:var(--accent)]">
            <!-- icône -->
            <span class="w-4 h-4 block bg-[color:var(--accent-foreground)] rounded-sm"></span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-[color:var(--foreground)]">FlexOffice</h1>
            <p class="text-xs text-gray-500">Projet étudiant - Réservation d'espaces</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button class="border px-3 py-2 rounded-md text-sm">Filtres</button>
          <button class="px-3 py-2 rounded-md text-sm text-white"
                  style="background: var(--accent)">
            + Nouvelle réservation
          </button>
          <div class="w-8 h-8 rounded-full overflow-hidden border">
            <img src="assets/professional-avatar.png" alt="" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <aside class="lg:col-span-1">
        <div class="mb-6 rounded-lg border bg-[color:var(--card)] text-[color:var(--foreground)]">
          <div class="p-4">
            <h3 class="text-lg font-semibold">Aujourd'hui</h3>
            <p class="text-sm text-gray-500">
              {{ selectedDate | date:'EEEE d MMMM y':'':'fr' }}
            </p>
          </div>
        </div>

        <div class="rounded-lg border bg-[color:var(--card)]">
          <div class="p-4">
            <h3 class="text-lg font-semibold">Mes réservations</h3>
          </div>
          <div class="p-4 pt-0 space-y-3">
            <div *ngFor="let b of upcomingBookings" class="p-3 bg-gray-100 rounded-lg">
              <div class="font-medium text-sm">{{ b.space }}</div>
              <div class="text-xs text-gray-600 mt-1">🕒 {{ b.time }}</div>
              <div class="text-xs text-gray-600 mt-1">👥 {{ b.attendees }} personne(s)</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <section class="lg:col-span-3">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold">Espaces disponibles</h2>
            <p class="text-gray-500 mt-1">Système de réservation — Projet académique</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="border px-3 py-1.5 rounded-md text-sm"
                    [class.bg-gray-900]="viewMode==='grid'"
                    [class.text-white]="viewMode==='grid'"
                    (click)="viewMode='grid'">Grille</button>
            <button class="border px-3 py-1.5 rounded-md text-sm"
                    [class.bg-gray-900]="viewMode==='list'"
                    [class.text-white]="viewMode==='list'"
                    (click)="viewMode='list'">Liste</button>
          </div>
        </div>

        <div class="grid gap-6" [ngClass]="viewMode==='grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'">
          <div *ngFor="let s of officeSpaces" class="rounded-lg border overflow-hidden bg-[color:var(--card)] shadow-sm">
            <div class="aspect-video relative">
              <img [src]="s.image" [alt]="s.name" class="w-full h-full object-cover">
              <span class="absolute top-3 right-3 px-2 py-1 text-xs rounded border"
                    [ngClass]="getAvailabilityClass(s.availability)">
                {{ getAvailabilityText(s.availability) }}
              </span>
            </div>

            <div class="p-4">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="text-xl font-semibold">{{ s.name }}</h4>
                  <div class="text-sm text-gray-600 mt-1">📍 {{ s.location }}</div>
                </div>
                <div class="text-sm text-gray-600">👥 {{ s.capacity }} pers.</div>
              </div>

              <div class="mt-4 space-y-4">
                <div>
                  <h5 class="font-medium text-sm mb-2">Équipements</h5>
                  <div class="flex flex-wrap gap-1">
                    <span *ngFor="let a of s.amenities" class="text-xs px-2 py-1 rounded bg-gray-100 border">{{ a }}</span>
                  </div>
                </div>

                <div *ngIf="s.nextBooking" class="text-sm text-gray-600">
                  🕒 Prochaine réservation: {{ s.nextBooking }}
                </div>

                <div class="flex gap-2">
                  <button class="flex-1 px-3 py-2 rounded text-white"
                          [class.opacity-50]="s.availability==='occupied'"
                          [disabled]="s.availability==='occupied'"
                          style="background: var(--accent)">
                    {{ s.availability==='available' ? 'Réserver' : 'Indisponible' }}
                  </button>
                  <button class="border px-3 py-2 rounded">📍</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  `
})
export class ReservationsDashboardPage {
  selectedDate = new Date();
  viewMode: 'grid' | 'list' = 'grid';

  officeSpaces = [
    { id:1, name:'Salle de réunion Alpha', capacity:8, location:'Étage 2',
      amenities:['Écran 4K','Visioconférence','Tableau blanc'],
      availability:'available' as Availability, nextBooking:'14:00', image:'assets/modern-meeting-room-with-glass-walls.png' },
    { id:2, name:'Bureau privé Beta', capacity:2, location:'Étage 1',
      amenities:['Bureau ajustable','Éclairage LED','Plantes'],
      availability:'occupied' as Availability, nextBooking:'16:30', image:'assets/private-office-with-modern-desk.jpg' },
    { id:3, name:'Espace collaboratif Gamma', capacity:12, location:'Étage 3',
      amenities:['Canapés','Tables modulaires','Café'],
      availability:'available' as Availability, nextBooking:'10:00', image:'assets/collaborative-workspace-with-comfortable-seating.jpg' },
    { id:4, name:'Cabine téléphonique', capacity:1, location:'Étage 1',
      amenities:['Insonorisation','Éclairage doux'],
      availability:'available' as Availability, nextBooking:null, image:'assets/phone-booth-office-pod.jpg' },
  ];

  upcomingBookings = [
    { id:1, space:'Salle Alpha', time:'09:00 - 10:30', attendees:6, organizer:'Marie Dubois' },
    { id:2, space:'Bureau Beta', time:'14:00 - 17:00', attendees:1, organizer:'Pierre Martin' },
  ];

  getAvailabilityClass(a: Availability) {
    if (a==='available') return 'bg-green-100 text-green-800 border-green-200';
    if (a==='occupied')  return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  }
  getAvailabilityText(a: Availability) {
    if (a==='available') return 'Disponible';
    if (a==='occupied')  return 'Occupé';
    return 'Indisponible';
  }
}
