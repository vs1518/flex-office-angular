import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appAspectRatio]' })
export class AspectRatioDirective {
  @Input('appAspectRatio') ratio = '16/9';
  @HostBinding('style.aspect-ratio') get ar() { return this.ratio; }
}
