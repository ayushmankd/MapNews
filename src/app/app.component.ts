import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private map!: L.Map;
  private centroid!: L.LatLngExpression;
  constructor() {
    this.centroid = [0.0, 0.0];
  }
  ngOnInit() {
    this.getCurrentLocationFromUser();
  }
  private initializeMap(currentLocation: GeolocationPosition): void {
    console.log(currentLocation.coords)
    const { latitude, longitude } = currentLocation.coords;
    this.centroid = [latitude, longitude];
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    console.log("MAP: ", this.map)
  }
  private getCurrentLocationFromUser(): void {
    try {
      navigator.geolocation.getCurrentPosition((coordinates) => this.initializeMap(coordinates));
    } catch (error) {
      console.error("ERROR: ", error);
      // TO Do Default Coords
    } 
  }
}
