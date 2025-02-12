import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'; 

import { AuthService } from '../../../auth/services/auth.service';
import { SessionService } from '../../services/session.service';
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";

@Component({
  selector: 'app-session-warning',
  imports: [CommonModule, MessageDialogComponent],
  template: `
    <app-message-dialog
      *ngIf="isExpired"
      title="!!"
      message="Your session has expired. Extend your session to continue"
      (confirm)="extendSession()"
      (cancel)="logout()"
    ></app-message-dialog>
  `
})
export class SessionWarningComponent implements OnInit, OnDestroy { 
  isExpired = false;
  private subscription: Subscription | undefined;

  constructor(private sessionService: SessionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.sessionService.sessionExpired$.subscribe((value) => { 
      this.isExpired = value;
    });
  }

  extendSession() {
    this.authService.setExpiry(); 
    this.isExpired = false;
  }

  logout() {
    this.authService.logout().then(() => {
      this.authService.clearExpirySetting();
      this.isExpired = false;

      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }
  }

}