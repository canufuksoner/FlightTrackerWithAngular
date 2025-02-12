import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionWarningComponent } from "./modules/shared/components/session-warning/session-warning.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SessionWarningComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  { }