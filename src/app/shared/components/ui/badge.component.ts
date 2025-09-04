import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

type Variant = 'default'|'secondary'|'destructive'|'outline';

@Component({
  standalone: true,
  selector: 'ui-badge',
  imports: [NgClass],
  template: `
  <span [ngClass]="[
    'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium w-fit',
    variantClass
  ]"><ng-content/></span>
  `
})
export class UIBadge {
  @Input() variant: Variant = 'default';
  get variantClass() {
    switch (this.variant) {
      case 'secondary': return 'border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white';
      case 'destructive': return 'border-transparent bg-red-600 text-white';
      case 'outline': return 'text-[color:var(--foreground)] hover:bg-gray-100';
      default: return 'border-transparent bg-[color:var(--accent)] text-[color:var(--accent-foreground)]';
    }
  }
}
