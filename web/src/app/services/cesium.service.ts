import { Injectable } from '@angular/core';
import * as Cesium from 'cesium';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CesiumService {
  private viewer: Cesium.Viewer | null = null;
  private entity: any | null = null;
  private handler: Cesium.ScreenSpaceEventHandler | null = null;
  private ws: WebSocket | null = null;

  // Get the information of the selected flight
  private selectedEntitySubject = new BehaviorSubject<Cesium.Entity | null>(null);
  selectedEntity$ = this.selectedEntitySubject.asObservable();

  // Error handling subject for WebSocket connection
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  constructor() {}

  initCesium(container: HTMLElement): Cesium.Viewer {
    this.viewer = new Cesium.Viewer(container, {
      shouldAnimate: true
    });

    return this.viewer;
  }

  addEntity(): Cesium.Entity {
    if (!this.viewer) throw new Error('*');

    this.entity = this.viewer.entities.add({
      name: 'Test Flight Vehicle',
      model: {
        uri: '/assets/sphere.gltf',
        scale: 0.05
      },
      position: Cesium.Cartesian3.fromDegrees(0, 0, 0)
    });

    return this.entity;
  }

  startWebSocket(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onmessage = (event) => {
      if (!this.entity || !this.viewer) return;

      const data = JSON.parse(event.data);
      const position = Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.alt);
      this.entity.position = position;

      if (this.viewer.trackedEntity !== this.entity) {
        this.viewer.trackedEntity = this.entity;
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.errorSubject.next('WebSocket error: Unable to connect to the backend');
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
      this.errorSubject.next('Connection lost: Backend is down');
    };
  }

  enableClickHandler() {
    if (!this.viewer) throw new Error('*');

    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);

    this.handler.setInputAction((movement: any) => {
      this.onLeftClick(movement.position);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  private onLeftClick(position: any) {
    if (!this.viewer || !this.entity) return;

    const pickedObject = this.viewer.scene.pick(position);

    if (Cesium.defined(pickedObject) && pickedObject.id) {
      if (pickedObject.id === this.entity) {
        this.viewer.trackedEntity = this.entity;
        console.log("Flight tracking started!");
        this.selectedEntitySubject.next(this.entity);
      } else {
        this.viewer.trackedEntity = undefined;
        console.log("Flight tracking stopped");
        this.selectedEntitySubject.next(null); 
      }
    } else {
      this.viewer.trackedEntity = undefined;
      console.log("Flight tracking stopped, Flight not selected");
      this.selectedEntitySubject.next(null);
    }
  }

  destroy() {
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    if (this.viewer) {
      this.viewer.entities.removeAll();
      this.viewer.destroy();
      this.viewer = null;
    }
  }
}
