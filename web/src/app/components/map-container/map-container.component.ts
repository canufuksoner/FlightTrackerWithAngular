import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { CesiumMapComponent } from "../cesium-map/cesium-map.component";
import { FlightDetailComponent } from "../cesium-map/flight-detail/flight-detail.component";
import { CesiumService } from '../../services/cesium.service';

@Component({
  selector: 'app-map-container',
  standalone: true,
  imports: [CommonModule, CesiumMapComponent, FlightDetailComponent],
  templateUrl: './map-container.component.html',
  styleUrl: './map-container.component.css'
})
export class MapContainerComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private subscription!: Subscription;

  constructor(private cesiumService: CesiumService) {}

  ngOnInit() {
    this.subscription = this.cesiumService.error$.subscribe((error) => {
      this.errorMessage = error;
    });
  }

  closeError() {
    this.errorMessage = null; // Close the error message
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}