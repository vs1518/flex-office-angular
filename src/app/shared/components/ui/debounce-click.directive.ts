import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[appDebounceClick]' })
export class DebounceClickDirective {
  @Input() debounceTime = 300;
  @Output() debounceClick = new EventEmitter<Event>();
  private timer?: any;

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.debounceClick.emit(e), this.debounceTime);
  }
}
