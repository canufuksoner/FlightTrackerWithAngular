import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      href="#"
      (click)="handleClick()"
      class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
    >
      {{ buttonText }}
    </a>
  `,
})
export class LinkButtonComponent {
  @Input() buttonText: string = '';
  @Output() buttonClicked = new EventEmitter<void>();

  handleClick() {
    this.buttonClicked.emit();
  }
}
