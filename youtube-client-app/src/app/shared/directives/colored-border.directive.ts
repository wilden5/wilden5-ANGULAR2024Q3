import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColoredBorder]',
})
export class ColoredBorderDirective implements OnInit {
  @Input() appColoredBorder?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const olderThan6MonthsMS = 6 * 30 * 24 * 60 * 60 * 1000;
    const between1And6MonthsMS = 30 * 24 * 60 * 60 * 1000;
    const between7DaysAnd1MonthMS = 7 * 24 * 60 * 60 * 1000;

    if (this.appColoredBorder) {
      const itemDate = new Date(this.appColoredBorder);
      const timeDifference = currentDate.getTime() - itemDate.getTime();

      switch (true) {
        case timeDifference > olderThan6MonthsMS:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
          break;
        case timeDifference >= between1And6MonthsMS:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
          break;
        case timeDifference >= between7DaysAnd1MonthMS:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'green');
          break;
        default:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'blue');
      }
    }
  }
}
