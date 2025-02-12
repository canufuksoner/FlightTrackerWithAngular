import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  // Error handling subject for WebSocket connection
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorMessageSubject.asObservable();

  constructor() {}

  showError(message: string) {
    this.errorMessageSubject.next(message);
  }

  clearError() {
    this.errorMessageSubject.next(null);
  }
}
