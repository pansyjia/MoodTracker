import { Injectable } from '@angular/core';
import { Location } from '../../models/models';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import firebase from 'firebase';
import '../../assets/js/place.js';
import { HttpClient } from "@angular/common/http";

const config = {
  apiKey: "AIzaSyC9ICYAY0GONi1mgiGgRjAAuaev2qqosvM",
  authDomain: "mood-tracker-8f5b8.firebaseapp.com",
  databaseURL: "https://mood-tracker-8f5b8.firebaseio.com",
  projectId: "mood-tracker-8f5b8",
  storageBucket: "mood-tracker-8f5b8.appspot.com",
  messagingSenderId: "1047636349755"
};

@Injectable()
export class LocationDataServiceProvider {
  private locations: Location[] = [];
  private serviceObserver: Subject<any>;
  private clientObservable: Subject<any>;
  private db: any;

  constructor(private http: HttpClient) {
    firebase.initializeApp(config);
    this.db = firebase.database();

    this.clientObservable = new Subject();
    this.serviceObserver = this.clientObservable;

    let dataRef = this.db.ref('/locations');
    dataRef.on('value', snapshot => {
      this.locations = [];
      snapshot.forEach(childSnapshot => {
        let location = {
          id: childSnapshot.key,
          name: childSnapshot.val().name,
          lat: childSnapshot.val().lat,
          lng: childSnapshot.val().lng,
          countAll: childSnapshot.val().countAll,
          googleMapId: childSnapshot.val().googleMapId
        };
        this.locations.push(location);
      });
    this.notifySubscribers();
    });
  }

  // private initLocations() {
  //   this.http.get('')
  // }

  // private initLocations() {
  //
  //
  //   let defaultLocation = {lat: 42.278382, lng: -83.735014};
  //   let mapService = new google.maps.places.PlacesService(mapObj);
  //
  //   let mapObj = new google.maps.Map(document.getElementById('map'), {
  //     center: defaultLocation,
  //     zoom: 15
  //   });
  //
  //   infowindow = new google.maps.InfoWindow();
  //   var service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch({
  //     location: pyrmont,
  //     radius: 500,
  //     type: ['store']
  //   }, callback);
  // }


  public getObservable(): Observable<Location[]> {
    return this.clientObservable;
  }

  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }

  public getPopularLocations(): Location[]{
    let locationsClone = JSON.parse(JSON.stringify(this.locations));
    return locationsClone.sort(function(a, b) {
      if (a.countAll > b.countAll) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  public getLocationByID(id: any): Location {
    for (let e of this.locations) {
      if (e.id === id) {
        let clone = JSON.parse(JSON.stringify(e));
        return clone;
      }
    }
    return undefined;
  }

  public addEntry(entry: Entry): void {
    let listEntry = this.db.ref('/locations');
    let entryRef = listEntry.push();
    let dataRecord = {
      location: entry.location,
      mood: entry.mood,
      text: entry.text,
      timestamp: new Date().toLocaleString()
    }
    entryRef.set(dataRecord);
    this.notifySubscribers();
  }

  // public updateEntry(key, newEntry: Entry): void {
  //   let parentRef = this.db.ref('/locations');
  //   let childRef = parentRef.child(key);
  //   let updateRecord = {
  //     // id: newEntry.id,
  //     location: newEntry.location,
  //     mood: newEntry.mood,
  //     text: newEntry.text,
  //     timestamp: new Date(newEntry.timestamp).toLocaleString()
  //   }
  //   childRef.set(updateRecord);
  //   this.notifySubscribers();
  // }

  public updateLocationCount(key, currentCount: number): void {
    let childRef = this.db.ref('/locations').child(key).child('countAll');
    childRef.set(currentCount + 1);
    this.notifySubscribers();
  }

  public initLocationsFromGoogle(): void {

  }
}
