import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { CesiumMapComponent } from '../../components/cesium-map/cesium-map.component';
import { FlightDetailComponent } from '../../components/flight-detail/flight-detail.component';
import { MessageDialogComponent } from '../../../shared/components/message-dialog/message-dialog.component';
import { ErrorService } from '../../../shared/services/error.service';

@Component({
  selector: 'app-map-container',
  imports: [
    CommonModule,
    CesiumMapComponent,
    FlightDetailComponent,
    MessageDialogComponent,
  ],
  templateUrl: './map-container.component.html',
})
export class MapContainerComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private subscription!: Subscription;

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.subscription = this.errorService.error$.subscribe((error) => {
      this.errorMessage = error;
    });
  }

  closeError() {
    this.errorMessage = null; // Close the error message
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
