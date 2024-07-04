import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  standalone: true,
  imports: [MatButtonModule, NgStyle],
})
export class CustomButtonComponent {
  @Input() buttonHeightREM?: number;

  @Output() buttonClickEvent = new EventEmitter<void>();

  buttonClick(): void {
    this.buttonClickEvent.emit();
  }
}
