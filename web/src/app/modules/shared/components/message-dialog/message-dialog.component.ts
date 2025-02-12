import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-dialog',
  imports: [CommonModule],
  templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() showButtons: boolean = true;
  @Input() confirmButtonText: string = 'Yes';
  @Input() cancelButtonText: string = 'No';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  close() {
    this.cancel.emit();
  }
}
