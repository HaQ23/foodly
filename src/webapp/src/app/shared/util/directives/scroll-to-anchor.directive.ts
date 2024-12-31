import { ViewportScroller } from '@angular/common';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[scrollToAnchor]',
})
export class ScrollToAnchorDirective {
  @Input('scrollToAnchor') anchorId: string;

  constructor(private readonly viewportScroller: ViewportScroller) {
    this.viewportScroller.setOffset([0,15]);
  }

  @HostListener('click') onClick() {
    this.viewportScroller.scrollToAnchor(this.anchorId);
  }
}
