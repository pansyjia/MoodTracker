import { Injectable } from '@angular/core';
import { Location } from '../../models/models';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import firebase from 'firebase';
import { Default_locations }  from '../../assets/cache/default_locations.js';
import { HttpClient } from "@angular/common/http";
import { Geolocation } from '@ionic-native/geolocation';



@Injectable()
export class LocationDataServiceProvider {
  private cacheLocations: Location[] = [ new Location() ];
  private cachedBlocks: string[] = [];
  private currentLocation: Location = new Location();
  private currentBlock: string = "999.00.999.00";
  private currentGeolocation: any = {'lat': 999, 'lng': 999};
  private serviceObserver: Subject<any>;
  private clientObservable: Subject<any>;
  private db: any;

  constructor(private http: HttpClient,
              private geolocation: Geolocation) {

    this.db = firebase.database();
    this.clientObservable = new Subject();
    this.serviceObserver = this.clientObservable;
    this.getCurrentGeolocation();
  }

  public getObservable(): Subject<any> {
    return this.clientObservable;
  }

  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }

  private getNearbyBlockNames(lat: number, lng: number): string[] {
    let blockNameList = [];
    for (let i of [-0.01, 0, +0.01]) {
      for (let j of [-0.01, 0, +0.01]) {
        let blockName = (lat + i).toFixed(2).toString() + '.' + (lng + j).toFixed(2).toString();
        blockNameList.push(blockName)
      }
    }
    return blockNameList;
  }

  public getCurrentGeolocation(): void {
    // console.log('calling getCurrentGeolocation');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentGeolocation = {'lat': resp.coords.latitude, 'lng': resp.coords.longitude};
    }).catch((error) => {});
    // console.log('this.currentGeolocation', this.currentGeolocation);
    let newBlockName = (this.currentGeolocation.lat).toFixed(2).toString() + '.' + (this.currentGeolocation.lng).toFixed(2).toString();
    if (newBlockName != this.currentBlock) {
      let nearbyBlocks = this.getNearbyBlockNames(this.currentGeolocation.lat, this.currentGeolocation.lng);
      for (let blockName of nearbyBlocks) {
        if ((blockName in this.cachedBlocks) == false) {
          this.cacheLocationsByBlock(blockName);
        }
      }
      console.log('this.cacheLocations before calculating distances', this.cacheLocations);
      for (let e of this.cacheLocations) {
        console.log('e is', e);
        let lat1 = this.currentGeolocation.lat;
        let lat2 = e.lat;
        let lon1 = this.currentGeolocation.lng;
        let lon2 = e.lng;
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;
        e.distanceToMe = 12742000 * Math.asin(Math.sqrt(a));
      };
    };
    this.cacheLocations = this.cacheLocations.sort(function(a, b) {
      if (a.distanceToMe < b.distanceToMe) {
        return -1;
      } else {
        return 1;
      }
    });
    this.currentLocation = this.cacheLocations[0];
    // console.log('sorted cached location data:', this.cacheLocations);
    // console.log('cached location blocks:', this.cachedBlocks);
    // console.log('current location :', this.currentLocation);
    this.notifySubscribers();
  }


  //////////////////////// Access the cached data

  public getNearbyLocations(): Location[]{
    let locations : Location[] = [];
    for (let e of this.cacheLocations) {
      if (e.distanceToMe < 1000) {
        let location = JSON.parse(JSON.stringify(e));
        locations.push(location)
      }
    }
    return JSON.parse(JSON.stringify(locations));
  }

  public getPopularLocations(): Location[]{
    let locations : Location[] = [];
    for (let e of this.cacheLocations) {
      if (e.distanceToMe < 1000) {
        let location = JSON.parse(JSON.stringify(e));
        locations.push(location)
      }
    }
    return locations.sort(function(a, b) {
      if (a.countAll > b.countAll) {
        return -1;
      } else {
        return 1;
      }
    }).slice(0, 3) ;
  }

  public getLocationByID(id: any): Location {
    for (let e of this.cacheLocations) {
      if (e.googleMapId === id) {
        let clone = JSON.parse(JSON.stringify(e));
        return clone;
      }
    }
    return undefined;
  }


  //////////////////////// Update cache or firebase database

  private cacheLocationsByBlock(blockName: string): void {
    // console.log('calling cacheLocationsByBlock(', blockName);
    let blockPath = blockName.split('.').join('/');
    let dataRef = this.db.ref('/allLocations/' + blockPath);
    dataRef.on('value', snapshot => {
      this.cachedBlocks.push(blockName);
      snapshot.forEach(childSnapshot => {
        let isNewLocation = true;
        for (let e of this.cacheLocations) {
          if (e.googleMapId == childSnapshot.val().googleMapId) {
            isNewLocation = false;
          }
        }
        if (isNewLocation) {
          let location = new Location(childSnapshot.val().name, childSnapshot.val().address, childSnapshot.val().lat, childSnapshot.val().lng, childSnapshot.val().countAll, childSnapshot.val().googleMapId)
          this.cacheLocations.push(location);
        }
      });
    });
    // console.log('ending cacheLocationsByBlock(', blockName, 'this.cacheLocations becomes ->', this.cacheLocations);
  }

  private sortCachedData(): void {

  }

  public addLocation(location: Location, setAsCurrent: boolean = false): void {
    let blockName = location.lat.toFixed(2).toString() + '.' + location.lng.toFixed(2).toString();
    let blockPath = blockName.split('.').join('/');
    this.db.ref('/allLocations/' + blockPath + '/' + location.googleMapId).set({
      name: location.name,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
      countAll: location.countAll,
      googleMapId: location.googleMapId
    });
    if (setAsCurrent) {
      this.getCurrentGeolocation();
      this.currentLocation = location;
      this.notifySubscribers();
    }
  }

  public updateLocationCount(location: Location): void {
    location.countAll += 1;
    let blockName = location.lat.toFixed(2).toString() + '.' + location.lng.toFixed(2).toString();
    let blockPath = blockName.split('.').join('/');
    this.db.ref('/allLocations/' + blockPath + '/' + location.googleMapId + '/countAll').set(location.countAll + 1);
    this.notifySubscribers();
  }

  public initLocationsFromGoogle(): void {

  }

  public dev_initLocations() {
    console.log(Default_locations);
    Default_locations.forEach((item) => {
      let location = new Location(item.name, item.vicinity, item.geometry.location.lat, item.geometry.location.lng, 0,  item.id);
      this.addLocation(location);
    })
  }


  //////////////////////// Geolocation

  public getCurrentLocation(): Location {
    return JSON.parse(JSON.stringify(this.currentLocation));
  }

  public getCurrentGPS(): any {
    console.log('this.currentGeolocation', this.currentGeolocation);
    return this.currentGeolocation;
  }

  public updateCurrentLocationByUser(location: Location): void {
    this.currentLocation = location;
    this.notifySubscribers();
  }

  public updateCurrentLocationByGPS(lat: number, lng: number): void {
    this.notifySubscribers();
  }

  public dev_fakeGeolocation() {
    this.currentGeolocation = {'lat': 42.280775, 'lng': -83.739845};
    this.getCurrentGeolocation();
  }

}
