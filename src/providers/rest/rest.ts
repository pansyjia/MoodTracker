import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6MTT0ofqku0B2PFugvKks5gykEid_Tkw&radius=500&location=';

  constructor(public http: HttpClient) {
    // console.log('Hello RestProvider Provider');

  }
  getListLocations(lat, lng): any {
    console.log(this.apiUrl+lat.toString()+','+lng.toString())
    this.http.get(this.apiUrl+lat.toString()+','+lng.toString()).subscribe(data => {
        return data;
      }, err => {
        console.log(err);
      });
  }

}
