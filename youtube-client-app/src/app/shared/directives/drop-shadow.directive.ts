import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropShadow]',
})
export class DropShadowDirective implements OnInit {
  @Input() appDropShadow?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const olderThan6MonthsMS = 6 * 30 * 24 * 60 * 60 * 1000;
    const between1And6MonthsMS = 30 * 24 * 60 * 60 * 1000;
    const between7DaysAnd1MonthMS = 7 * 24 * 60 * 60 * 1000;

    if (this.appDropShadow) {
      const itemDate = new Date(this.appDropShadow);
      const timeDifference = currentDate.getTime() - itemDate.getTime();

      switch (true) {
        case timeDifference > olderThan6MonthsMS:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(185, 19, 19, 0.25))'
          );
          break;
        case timeDifference >= between1And6MonthsMS:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(250, 241, 2, 0.25))'
          );
          break;
        case timeDifference >= between7DaysAnd1MonthMS:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(52, 120, 48, 0.25))'
          );
          break;
        default:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(47, 128, 237, 0.25))'
          );
      }
    }
  }
}
