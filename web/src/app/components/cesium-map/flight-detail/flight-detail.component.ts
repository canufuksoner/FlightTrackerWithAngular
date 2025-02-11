import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CesiumService } from '../../../services/cesium.service';

@Component({
  selector: 'app-flight-detail',
  imports: [CommonModule],
  templateUrl: './flight-detail.component.html'
})
export class FlightDetailComponent implements OnInit, OnDestroy {
  selectedEntity: any = null;
  private subscription!: Subscription;

  constructor(private cesiumService: CesiumService) {}

  ngOnInit() {
    // Track selected flight
    this.subscription = this.cesiumService.selectedEntity$.subscribe(entity => {
      this.selectedEntity = entity;
    });
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
