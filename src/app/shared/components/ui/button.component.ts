import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

type Variant = 'default'|'destructive'|'outline'|'secondary'|'ghost'|'link';
type Size = 'sm'|'default'|'lg'|'icon';

@Component({
  standalone: true,
  selector: 'ui-button',
  imports: [NgClass],
  template: `
  <button [attr.type]="type" [disabled]="disabled"
    [ngClass]="[
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none',
      disabled ? 'pointer-events-none opacity-50' : '',
      variantClass, sizeClass
    ]">
    <ng-content/>
  </button>
  `
})
export class UIButton {
  @Input() variant: Variant = 'default';
  @Input() size: Size = 'default';
  @Input() type: 'button'|'submit'|'reset' = 'button';
  @Input() disabled = false;

  get variantClass() {
    switch (this.variant) {
      case 'destructive': return 'bg-red-600 text-white hover:bg-red-700';
      case 'outline': return 'border bg-white hover:bg-gray-100 dark:bg-transparent';
      case 'secondary': return 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white';
      case 'ghost': return 'hover:bg-gray-100 dark:hover:bg-gray-800';
      case 'link': return 'text-blue-600 underline underline-offset-4 hover:no-underline';
      default: return 'bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:opacity-90';
    }
  }
  get sizeClass() {
    switch (this.size) {
      case 'sm': return 'h-8 px-3';
      case 'lg': return 'h-10 px-6';
      case 'icon': return 'size-9';
      default: return 'h-9 px-4';
    }
  }
}
