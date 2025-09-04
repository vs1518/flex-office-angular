import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'ui-breadcrumb',
  imports: [RouterLink, CommonModule],
   template: `
    <nav class="text-sm text-gray-600">
      <ol class="flex items-center gap-2">
        <li *ngFor="let c of items; let last = last">
          <a *ngIf="!last && c.link" [routerLink]="c.link" class="hover:underline">{{ c.label }}</a>
          <span *ngIf="last || !c.link" class="font-medium">{{ c.label }}</span>
          <span *ngIf="!last" class="mx-1">/</span>
        </li>
      </ol>
    </nav>
  `
})
export class UIBreadcrumb {
  @Input() items: {label: string; link?: any[]|string}[] = [];
}
