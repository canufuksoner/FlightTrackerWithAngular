import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parimary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="handleClick()"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {{ buttonText }}  
    </button>
  `
})
export class PrimaryButtonComponent {
  @Input() buttonText: string = ""; 
  @Output() buttonClicked = new EventEmitter<void>();

  handleClick() {
    this.buttonClicked.emit();
  }
}