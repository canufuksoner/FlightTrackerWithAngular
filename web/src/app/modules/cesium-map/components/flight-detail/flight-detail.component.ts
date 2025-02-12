import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CesiumService } from '../../services/cesium.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { FlightDetail } from '../../models/flight-detail';
import { LogoutButtonComponent } from "../../../auth/components/logout-button/logout-button.component";
import { MaskStringPipe } from '../../../shared/pipes/mask-string.pipe';

@Component({
  selector: 'app-flight-detail',
  imports: [CommonModule, LogoutButtonComponent, MaskStringPipe],
  templateUrl: './flight-detail.component.html'
})
export class FlightDetailComponent implements OnInit, OnDestroy {
  selectedEntity: FlightDetail | null = null;
  private subscription!: Subscription;

  constructor(private cesiumService: CesiumService) {}

  ngOnInit() {
    // Track selected flight
    this.subscription = this.cesiumService.selectedEntity$.subscribe(entity => {
      if (entity) { 
        this.selectedEntity = {
          name: entity.name,
          flightId: entity.id
        };
      } else {
        this.selectedEntity = null; 
      }
    });
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
