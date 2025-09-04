import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

type Variant = 'default'|'destructive';

@Component({
  standalone: true,
  selector: 'ui-alert',
  imports: [NgClass],
  template: `
  <div role="alert" [ngClass]="[
    'w-full rounded-lg border px-4 py-3 text-sm grid gap-x-3',
    variant==='destructive' ? 'text-red-700 bg-[color:var(--card)]' : 'bg-[color:var(--card)]'
  ]">
    <div class="font-medium"><ng-content select="[title]"/></div>
    <div class="text-gray-600"><ng-content select="[description]"/></div>
    <ng-content/>
  </div>
  `
})
export class UIAlert {
  @Input() variant: Variant = 'default';
}
