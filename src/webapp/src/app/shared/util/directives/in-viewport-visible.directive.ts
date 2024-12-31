import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[viewportVisible]',
})
export class InViewportVisibleDirective implements AfterContentInit {
  @Input('viewportVisible') targetSection: string;
  @Input() viewportVisibleClass: string;
  private observer: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngAfterContentInit() {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { rootMargin: '0px 0px -95% 0px' }
      );
      const targetElement = this.renderer.selectRootElement(
        this.targetSection,
        true
      );

      this.observer.observe(targetElement);
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(
          this.el.nativeElement,
          this.viewportVisibleClass
        );
      } else {
        this.renderer.removeClass(
          this.el.nativeElement,
          this.viewportVisibleClass
        );
      }
    });
  }
}
