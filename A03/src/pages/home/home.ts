import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseProvider } from '../../providers/database/database';

// We MUST import both the firebase AND firestore modules like so
//import * as firebase from 'firebase';
//import 'firebase/firestore';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    //Constructor parameters
    public navCtrl: NavController,
    public geolocation: Geolocation,
    private _database: DatabaseProvider, ) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //Adds location document to our firebase collection
      this._database.addDocument('locations', {
        //point: {
        //  lat: position.coords.latitude, 
        //  lon: position.coords.longitude
        //},
        point: this._database.geo(position.coords.latitude, position.coords.longitude),
        time: Math.round(new Date().getTime() / 1000)
      });

    }, (err) => {
      console.log(err);
    });


  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
}