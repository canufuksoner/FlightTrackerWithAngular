import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { ErrorService } from '../../../shared/services/error.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../../../shared/components/input/input.component";
import { PrimaryButtonComponent } from "../../../shared/components/buttons/primary-button.coponent";
import { LinkButtonComponent } from "../../../shared/components/buttons/link-button.coponent";

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, InputComponent, PrimaryButtonComponent, LinkButtonComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginModel: LoginModel = { 
    name: 'test',
    password: '1234'
  };

  constructor(private authService: AuthService, public errorService: ErrorService, private router: Router) { }

  onSubmit() {
    this.errorService.clearError(); 
    this.authService.login(this.loginModel).then(result => {
      if (result) {
        this.router.navigate(['/map']);
      } else {
        this.errorService.showError("Invalid name or password");
      }
    });
  }
}
