import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-reservation-list',
  template: `
    <h1 class="text-2xl font-bold mb-4">Réservations</h1>
    <p class="text-gray-600">Ici on affichera la liste des réservations (Flex-Office).</p>
  `,
})
export class ReservationListPage {}
