import { Component } from '@angular/core';
import { MapContainerComponent } from "./components/map-container/map-container.component";

@Component({
  selector: 'app-root',
  imports: [MapContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
