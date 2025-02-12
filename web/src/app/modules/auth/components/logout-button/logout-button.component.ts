import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorButtonComponent } from "../../../shared/components/buttons/error-button.coponent";

@Component({
  selector: 'app-logout-button',
  imports: [ErrorButtonComponent],
  template: `
     <div class="flex justify-end">
      <app-error-button
        buttonText="Logout"
        (buttonClicked)="logout()"
      />
    </div>
  `
})
export class LogoutButtonComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().then(() => { 
      this.router.navigate(['/login']); 
    });
  }
}
