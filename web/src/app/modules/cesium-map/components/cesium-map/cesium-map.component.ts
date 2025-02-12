import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as Cesium from 'cesium';
import { CesiumService } from '../../services/cesium.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-cesium-map',
  templateUrl: './cesium-map.component.html'
})
export class CesiumMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cesiumContainer', { static: false }) cesiumContainer!: ElementRef;
  viewer: any;
  entity: any;
  handler: any;

  constructor(private cesiumService: CesiumService) {}

  ngOnInit() {
    Cesium.Ion.defaultAccessToken = environment.cesiumToken;
  }

  ngAfterViewInit() {
    if (!this.cesiumContainer || !this.cesiumContainer.nativeElement) {
      return;
    }

    const viewer = this.cesiumService.initCesium(this.cesiumContainer.nativeElement);
    this.cesiumService.addEntity();
    this.cesiumService.startWebSocket(environment.wsUrl);
    this.cesiumService.enableClickHandler();
  }

  ngOnDestroy() {
    if (this.handler) {
      this.cesiumService.destroy();
    }
  }
}