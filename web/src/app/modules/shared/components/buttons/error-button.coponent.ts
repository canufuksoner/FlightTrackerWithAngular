import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="handleClick()"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      {{ buttonText }}  
    </button>
  `
})
export class ErrorButtonComponent {
  @Input() buttonText: string = ""; 
  @Output() buttonClicked = new EventEmitter<void>();

  handleClick() {
    this.buttonClicked.emit();
  }
}