import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-avatar',
  template: `
  < <div class="w-8 h-8 rounded-full overflow-hidden border">
      <img [src]="src" [alt]="alt" class="w-full h-full object-cover"/>
    </div>
  `
})
export class UIAvatar {
  @Input() src = '';
  @Input() alt = '';
  @Input() fallback = '';
}
